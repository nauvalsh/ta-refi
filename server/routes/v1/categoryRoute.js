const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(categoryController.getCategories)
  .post(auth('admin'), categoryController.createCategory);

module.exports = router;
