'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductOrder.hasOne(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      ProductOrder.hasOne(models.ShippingOrder, {
        foreignKey: 'productorderId',
        as: 'shippingOrder',
      });
      ProductOrder.hasMany(models.ProductOrderDetail, {
        foreignKey: 'productorderId',
        as: 'productOrderDetails',
      });
    }
  }
  ProductOrder.init(
    {
      userId: DataTypes.INTEGER,
      priceOrder: DataTypes.DOUBLE,
      orderDate: DataTypes.DATE,
      orderName: DataTypes.STRING,
      orderNote: DataTypes.STRING,
      orderStatus: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ProductOrder',
      tableName: 'productorders',
    }
  );
  return ProductOrder;
};
