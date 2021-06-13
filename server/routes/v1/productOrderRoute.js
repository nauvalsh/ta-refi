const express = require('express');
const router = express.Router();
const productOrderController = require('../../controllers/productOrderController');
const auth = require('../../middlewares/auth');
const files = require('../../utils/files');

router
  .route('/')
  .get(productOrderController.getProductOrders)
  .post(auth('admin'), productOrderController.createProductOrder);

router.route('/users').get(productOrderController.getProductOrderByUsers);

router.route('/:id').delete(auth('admin'), productOrderController.deleteProductOrder);
router.route('/:id', productOrderController.cancelProductOrder);
router.route('/cancel/:productorderId').patch(productOrderController.cancelProductOrder);
router.route('/:id').patch(productOrderController.updateProductOrder);

module.exports = router;
