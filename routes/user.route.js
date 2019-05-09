var express = require('express');

var controller = require('../controllers/user.controller');
var userValidate = require('../validate/user.validate');

var router = express.Router();

router.get('/', controller.index);

router.get('/cookies', function(req, res, next) {
	res.cookie('user-id', 12345);
	res.send('Hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', userValidate.postCreate, controller.postCreate);

module.exports = router;