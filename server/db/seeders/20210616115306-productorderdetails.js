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
for (let i = 0; i < 50; i++) {
  if (i < 13) {
    data.push({
      productId: i % 2 === 0 ? 1 : 2,
      unitPrice: i % 2 === 0 ? 2000 : 3000,
      qty: 10,
      discount: 0
    });
  }

  data.push({
    productId: i % 2 === 0 ? 1 : 2,
    unitPrice: i % 2 === 0 ? 2000 : 3000,
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
