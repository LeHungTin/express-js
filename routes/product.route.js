var express = require('express');

var productController = require('../controllers/product.controller');

var router = express.Router();

router.get('/', productController.index);

router.get('/search', productController.search);

router.get('/create', productController.create);

router.get('/:id', productController.get);

router.post('/create', productController.postCreate);


module.exports = router;