'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductOrderDetail.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
    }
  }
  ProductOrderDetail.init(
    {
      productorderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      unitPrice: DataTypes.DOUBLE,
      qty: DataTypes.INTEGER,
      discount: DataTypes.DOUBLE
    },
    {
      sequelize,
      modelName: 'ProductOrderDetail',
      tableName: 'productorderdetails'
    }
  );
  return ProductOrderDetail;
};
