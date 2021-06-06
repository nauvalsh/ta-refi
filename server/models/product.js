'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      categoryId: DataTypes.NUMBER,
      productName: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      weight: DataTypes.DOUBLE,
      stock: DataTypes.DOUBLE,
      unit: DataTypes.STRING,
      image: DataTypes.STRING,
      desc: DataTypes.TEXT,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
    }
  );
  return Product;
};
