var express = require('express');

var productController = require('../controllers/product.controller');

var router = express.Router();

router.get('/', productController.index);

module.exports = router;