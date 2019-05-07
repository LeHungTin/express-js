var express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');
var productRoute = require('./routes/product.route');

var port = 3000;

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.render('index');
});

app.use('/users', userRoute);
app.use('/products', productRoute);

app.listen(port, function() {
	console.log('Express listen on port ' + port);
});