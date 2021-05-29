const { Category } = require('../models');
const { getAll, createOne } = require('./refactorController');

const getCategories = getAll(Category, 'categories');
const createCategory = createOne(Category, 'category');

module.exports = {
  getCategories,
  createCategory,
};
