const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const auth = require('../../middlewares/auth');
const files = require('../../utils/files');

router
  .route('/')
  .get(productController.getProducts)
  .post(
    auth('admin'),
    files.uploadSingle('products', 'image', './public/images/products'),
    productController.createProduct
  );

router.route('/:id').delete(auth('admin'), productController.deleteProduct);

module.exports = router;
