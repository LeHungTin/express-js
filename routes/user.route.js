var express = require('express');

var controller = require('../controllers/user.controller');
var userValidate = require('../validate/user.validate');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', userValidate.postCreate, controller.postCreate);

module.exports = router;