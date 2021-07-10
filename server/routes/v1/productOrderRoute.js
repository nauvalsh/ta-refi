const express = require('express');
const router = express.Router();
const productOrderController = require('../../controllers/productOrderController');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(auth(), productOrderController.getProductOrders)
  .post(productOrderController.createProductOrder);

router.route('/report/permonth').get(productOrderController.getProductOrderPerMonth);
router
  .route('/report/count/perday')
  .get(productOrderController.getProductOrderCountPerDay);

router.route('/users').get(productOrderController.getProductOrderByUsers);
router.route('/:id').get(productOrderController.getOneProductOrders);

router.route('/:id').delete(auth('admin'), productOrderController.deleteProductOrder);

router.route('/cancel/:productorderId').patch(productOrderController.cancelProductOrder);
router.route('/:id').patch(productOrderController.updateProductOrder);

module.exports = router;
