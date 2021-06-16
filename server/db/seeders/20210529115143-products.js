'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'products',
      [
        {
          categoryId: 1,
          productName: 'Indomie Goreng Spesial',
          price: 2000,
          weight: 100,
          stock: 100,
          unit: 'pcs',
          desc: 'Indomie Goreng Spesial per-piece',
          image: 'indomiegorengspecial.png',
          isActive: true
        },
        {
          categoryId: 2,
          productName: 'Sabun Giv Batang',
          price: 3000,
          weight: 100,
          stock: 200,
          unit: 'pcs',
          desc: 'Sabun Giv batangan',
          image: 'sabungiv.jpg',
          isActive: true
        },
        {
          categoryId: 3,
          productName: 'Shampo Lifebuoy Saset 100mL',
          price: 1000,
          weight: 100,
          stock: 330,
          unit: 'pcs',
          desc: 'Shampo Lifebuoy sasetan',
          image: 'lifebuoysaset.jpg',
          isActive: true
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('products', null, {});
     */

    await queryInterface.bulkDelete('products', null, {});
  }
};
