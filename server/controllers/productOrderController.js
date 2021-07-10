const {
  Product,
  ProductOrder,
  ProductOrderDetail,
  ShippingOrder,
  User,
  sequelize,
  Sequelize
} = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { getAll, createOne, deleteOne, getOne } = require('./refactorController');
const { Op, QueryTypes } = require('sequelize');
const dayjs = require('dayjs');

let include = [
  {
    model: ProductOrderDetail,
    as: 'productOrderDetails',
    include: [
      {
        model: Product,
        as: 'product'
      }
    ]
  }
];

const getProductOrders = getAll(ProductOrder, 'productOrders', include);
const getOneProductOrders = getOne(ProductOrder, 'productOrders', include);
const deleteProductOrder = deleteOne(ProductOrder, 'productOrder');

const createProductOrder = catchAsync(async (req, res, next) => {
  await sequelize.transaction(async (transaction) => {
    console.log(req.body);
    const { user, orderDetails, ...restBody } = req.body;

    const [userDb, isCreated] = await User.findOrCreate({
      where: { phoneNumber: user.phoneNumber },
      defaults: user,
      transaction
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
        paymentMethod: restBody.paymentMethod
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
          discount: item.discount
        },
        { transaction }
      );

      items.push(detail);

      let product = await Product.findOne({
        where: {
          id: item.productId
        }
      });

      if (product.stock < item.qty) throw new AppError('Stock is not enough', 400);

      product.stock = product.stock - item.qty;

      await product.save({ transaction });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        productOrder,
        productOrderDetails: items
      }
    });
  });
});

const cancelProductOrder = catchAsync(async (req, res, next) => {
  await sequelize.transaction(async (transaction) => {
    const { productorderId } = req.params;

    const productOrder = await ProductOrder.findOne({
      where: {
        id: productorderId
      },
      include: [
        {
          model: ProductOrderDetail,
          as: 'productOrderDetails'
        }
      ]
    });

    for (let item of productOrder.productOrderDetails) {
      let product = await Product.findOne({
        where: {
          id: item.productId
        }
      });

      product.stock = item.qty + product.stock;

      await product.save({ transaction });
    }

    productOrder.orderStatus = 'cancel';
    await productOrder.save();

    res.status(200).json({
      status: 'success',
      message: 'Order has been cancelled'
    });
  });
});

const getProductOrderByUsers = catchAsync(async (req, res, next) => {
  let users = await User.findAll({
    attributes: ['id', 'name', 'email', 'phoneNumber'],
    include: [
      {
        model: ProductOrder,
        as: 'productOrders',
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt']
        },
        required: true
      }
    ],
    order: [[{ model: ProductOrder, as: 'productOrders' }, 'id', 'DESC']]
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
      users: modifyUser
    }
  });
});

const updateProductOrder = catchAsync(async (req, res, next) => {
  const updateProductOrder = await ProductOrder.update(req.body, {
    where: {
      id: req.params.id
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      updateProductOrder
    }
  });
});

const getProductOrderPerMonth = catchAsync(async (req, res, next) => {
  const results = await sequelize.query(
    `SELECT DATE_FORMAT(productorders.orderDate, "%m-%Y") AS month, SUM(productorders.priceOrder) AS total
  FROM productorders
  GROUP BY DATE_FORMAT(productorders.orderDate, "%m-%Y")`,
    { type: QueryTypes.SELECT }
  );

  res.status(200).json({
    status: 'success',
    data: results
  });
});

const getProductOrderCountPerDay = catchAsync(async (req, res, next) => {
  const countToday = await sequelize.query(
    `SELECT COUNT(*) AS todayOrders FROM productorders WHERE DATE(orderDate) = "${dayjs(
      new Date()
    ).format('YYYY-MM-DD')}"`,
    { type: QueryTypes.SELECT }
  );

  const sumToday = await sequelize.query(
    `SELECT SUM(priceOrder) AS todaySum FROM productorders WHERE DATE(orderDate) = "${dayjs(
      new Date()
    ).format('YYYY-MM-DD')}"`,
    { type: QueryTypes.SELECT }
  );

  const newUserToday = await sequelize.query(
    `SELECT COUNT(*) AS todayUsers FROM users WHERE DATE(createdAt) = "${dayjs(
      new Date()
    ).format('YYYY-MM-DD')}"`,
    { type: QueryTypes.SELECT }
  );

  const totalUsers = await sequelize.query(`SELECT COUNT(*) AS totalUsers FROM users`, {
    type: QueryTypes.SELECT
  });

  res.status(200).json({
    status: 'success',
    data: {
      count: countToday[0].todayOrders,
      sum: sumToday[0].todaySum,
      newUsers: newUserToday[0].todayUsers,
      totalUsers: totalUsers[0].totalUsers
    }
  });
});

module.exports = {
  getProductOrders,
  createProductOrder,
  deleteProductOrder,
  getProductOrderByUsers,
  cancelProductOrder,
  updateProductOrder,
  getOneProductOrders,
  getProductOrderPerMonth,
  getProductOrderCountPerDay
};
