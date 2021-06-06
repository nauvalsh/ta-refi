const {
  Product,
  ProductOrder,
  ProductOrderDetail,
  ShippingOrder,
  User,
  sequelize,
} = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { getAll, createOne, deleteOne } = require('./refactorController');

const getProductOrders = getAll(ProductOrder, 'productOrders');
const deleteProductOrder = deleteOne(ProductOrder, 'productOrder');

const createProductOrder = catchAsync(async (req, res, next) => {
  await sequelize.transaction(async (transaction) => {
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

    orderDetails.map(async (item, i) => {
      await ProductOrderDetail.create(
        {
          productorderId: productOrder.id,
          productId: item.productId,
          unitPrice: item.unitPrice,
          qty: item.qty,
          discount: item.discount,
        },
        { transaction }
      );

      let product = await Product.findOne({
        where: {
          id: productId,
        },
      });

      if (product.stock < item.qty) throw new AppError('Stock is not enough', 400);

      product.stock = product.stock - item.qty;

      await product.save();
    });

    return res.status(200).json({
      status: 'success',
      data: {
        productOrder,
      },
    });
  });
});

module.exports = {
  getProductOrders,
  createProductOrder,
  deleteProductOrder,
};
