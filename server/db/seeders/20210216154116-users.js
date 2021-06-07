'use strict';

let faker = require('faker');
let data = [];

// password = test123
for (let i = 0; i < 50; i++) {
  if (i === 0) {
    data.push({
      name: 'Nauval S',
      email: 'nauvalsh@gmail.com',
      phoneNumber: '087875789220',
      password: '$2a$08$J.gYPG4tIeOTsTsOPauC5OC.6uinjSExXJhrPuXIrvPrsVp18T45S',
      photo: faker.internet.avatar(),
      role: 'admin',
      apiKey: faker.finance.ethereumAddress(),
      active: 1,
      activationToken: faker.finance.litecoinAddress(),
    });
  }

  data.push({
    name: faker.name.findName().toUpperCase(),
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.phoneNumberFormat().split('-').join(''),
    password: '$2a$08$J.gYPG4tIeOTsTsOPauC5OC.6uinjSExXJhrPuXIrvPrsVp18T45S',
    photo: faker.internet.avatar(),
    role: i % 2 == 1 ? 'admin' : 'user',
    apiKey: faker.finance.ethereumAddress(),
    active: 1,
    activationToken: faker.finance.litecoinAddress(),
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
