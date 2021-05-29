const { Category } = require('../models');
const { getAll, createOne, deleteOne } = require('./refactorController');

const getCategories = getAll(Category, 'categories');
const createCategory = createOne(Category, 'category');
const deleteCategory = deleteOne(Category, 'category');

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
