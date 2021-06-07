const express = require('express');
const router = express.Router();
const productOrderController = require('../../controllers/productOrderController');
const auth = require('../../middlewares/auth');
const files = require('../../utils/files');

router
  .route('/')
  .get(productOrderController.getProductOrders)
  .post(
    auth('admin'),
    files.uploadSingle('products', 'image', './public/images/products'),
    productOrderController.createProductOrder
  );

router.route('/users').get(productOrderController.getProductOrderByUsers);

router.route('/:id').delete(auth('admin'), productOrderController.deleteProductOrder);

module.exports = router;
