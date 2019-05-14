var Product = require('../models/product.model');

module.exports.index = async function(req, res) {
  var products = await Product.find();
  res.render('products/index', {
    products: products
  });
};

// var shortId = require('shortid');

// var db = require('../db');

// module.exports.index = function (req, res) {
//   var page = parseInt(req.query.page) || 1; // n
//   var perPage = 8; // x'

//   var start = (page - 1) * perPage;
//   var end = page * perPage;

//   res.render('products/index', {
//   	products: db.get('products').value().slice(start, end)
//   });
// }

// module.exports.search = function (req, res) {
// 	var q = req.query.q;

// 	var matchedProducts = db.get('products').value().filter(function(pro) {
//   		return pro.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
//   	});

//   res.render('products/index', {
//   	products: matchedProducts
//   });
// }

// module.exports.create = function (req, res) {
//   res.render('products/create');
// }

// module.exports.get = function(req, res) {
//   var id = req.params.id;

//   var pro = db.get('products').find({ id: id }).value();

//   res.render('products/view', {
//     pro: pro
//   });

// }

// module.exports.postCreate = function (req, res) {
//   req.body.id = shortId.generate();

//  	db.get('products').push(req.body).write();

//  	res.redirect('/products');
// }