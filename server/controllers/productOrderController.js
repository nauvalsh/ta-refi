const {
  Product,
  ProductOrder,
  ProductOrderDetail,
  ShippingOrder,
  User,
  sequelize,
  Sequelize,
} = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { getAll, createOne, deleteOne } = require('./refactorController');
const { Op } = require('sequelize');

let include = [
  {
    model: ProductOrderDetail,
    as: 'productOrderDetails',
  },
];

const getProductOrders = getAll(ProductOrder, 'productOrders', include);
const deleteProductOrder = deleteOne(ProductOrder, 'productOrder');

const createProductOrder = catchAsync(async (req, res, next) => {
  await sequelize.transaction(async (transaction) => {
    console.log(req.body);
    const { user, orderDetails, ...restBody } = req.body;

    const [userDb, isCreated] = await User.findOrCreate({
      where: { phoneNumber: user.phoneNumber },
      defaults: user,
      transaction,
    });

    let orderStatus = 'completed';
    if (restBody.paymentMethod === 'TRANSFERBANK') orderStatus = 'processing';

    const productOrder = await ProductOrder.create(
      {
        userId: userDb.id,
        priceOrder: restBody.priceOrder,
        orderDate: new Date(),
        orderName: restBody.orderName,
        orderNote: restBody.orderNote,
        orderStatus: orderStatus,
        paymentMethod: restBody.paymentMethod,
      },
      { transaction }
    );

    let items = [];
    for (let item of orderDetails) {
      let detail = await ProductOrderDetail.create(
        {
          productorderId: productOrder.id,
          productId: item.productId,
          unitPrice: item.unitPrice,
          qty: item.qty,
          discount: item.discount,
        },
        { transaction }
      );

      items.push(detail);

      let product = await Product.findOne({
        where: {
          id: item.productId,
        },
      });

      if (product.stock < item.qty) throw new AppError('Stock is not enough', 400);

      product.stock = product.stock - item.qty;

      await product.save({ transaction });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        productOrder,
        productOrderDetails: items,
      },
    });
  });
});

const cancelProductOrder = catchAsync(async (req, res, next) => {
  await sequelize.transaction(async (transaction) => {
    const { productorderId } = req.params;

    const productOrder = await ProductOrder.findOne({
      where: {
        id: productorderId,
      },
      include: [
        {
          model: ProductOrderDetail,
          as: 'productOrderDetails',
        },
      ],
    });

    for (let item of productOrder.productOrderDetails) {
      let product = await Product.findOne({
        where: {
          id: item.productId,
        },
      });

      product.stock = item.qty + product.stock;

      await product.save({ transaction });
    }

    res.status(200).json({
      status: 'success',
      message: 'Order has been cancelled',
    });
  });
});

const getProductOrderByUsers = catchAsync(async (req, res, next) => {
  let users = await User.findAll({
    attributes: ['id', 'name', 'email'],
    include: [
      {
        model: ProductOrder,
        as: 'productOrders',
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt'],
        },
        required: true,
      },
    ],
    order: [[{ model: ProductOrder, as: 'productOrders' }, 'id', 'DESC']],
  });

  let modifyUser = [];

  for (let user of users) {
    let totalBelanja = 0;

    for (let productOrder of user.productOrders) {
      totalBelanja = totalBelanja + productOrder.priceOrder;
    }

    user.setDataValue('totalOrders', user.productOrders.length);
    user.setDataValue('totalBelanja', totalBelanja);
    modifyUser.push(user);
  }

  res.status(200).json({
    status: 'success',
    data: {
      users: modifyUser,
    },
  });
});

module.exports = {
  getProductOrders,
  createProductOrder,
  deleteProductOrder,
  getProductOrderByUsers,
  cancelProductOrder,
};
