'use strict';

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let faker = require('faker');
let data = [];

// password = test123
for (let i = 0; i < 63; i++) {
  if (i < 13) {
    data.push({
      productId: 2,
      unitPrice: 3000,
      productorderId: i + 1,
      qty: 10,
      discount: 0
    });
  }

  data.push({
    productId: 2,
    unitPrice: 3000,
    productorderId: i + 1,
    qty: 10,
    discount: 0
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('productorderdetails', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productorderdetails', null, {});
  }
};
