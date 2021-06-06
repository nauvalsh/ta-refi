'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShippingOrder.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      productorderId: {
        type: DataTypes.INTEGER,
      },
      addressAs: {
        type: DataTypes.STRING,
      },
      province: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      subdistrict: {
        type: DataTypes.STRING,
      },
      detailAddress: {
        type: DataTypes.STRING,
      },
      service: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      lng: {
        type: DataTypes.STRING,
      },
      lat: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'ShippingOrder',
      tableName: 'shippingorders',
    }
  );
  return ShippingOrder;
};
