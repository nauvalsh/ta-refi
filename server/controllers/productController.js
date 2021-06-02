const { Product } = require('../models');
const { getAll, createOne, deleteOne } = require('./refactorController');

const getProducts = getAll(Product, 'products');
const createProduct = createOne(Product, 'product', 'image');
const deleteProduct = deleteOne(Product, 'product');

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
};
