const express = require('express');
const router = express.Router();

const exportController = require('../../controllers/exportController');

// http://localhost:5000/api/v1/users?page=1&limit=10&order=id:ASC
router.get('/excel/users', exportController.exportExcel);

module.exports = router;
