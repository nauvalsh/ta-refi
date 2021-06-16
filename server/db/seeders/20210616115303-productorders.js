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
      userId: 2,
      orderDate: randomDate(new Date(2021, 0, 1), new Date()),
      priceOrder: i % 2 === 0 ? 20000 : 30000,
      orderName: faker.name.findName().toUpperCase(),
      orderNote: '-',
      paymentMethod: i % 2 === 0 ? 'TRANSFERBANK' : 'CASH',
      orderStatus: 'completed'
    });
  }

  data.push({
    userId: getRandomInt(1, 49),
    priceOrder: i % 2 === 0 ? 20000 : 30000,
    orderDate: randomDate(new Date(2021, 0, 1), new Date()),
    orderName: faker.name.findName().toUpperCase(),
    orderNote: '-',
    paymentMethod: i % 2 === 0 ? 'TRANSFERBANK' : 'CASH',
    orderStatus: 'completed'
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('productorders', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productorders', null, {});
  }
};
