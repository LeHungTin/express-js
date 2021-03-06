require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose= require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var userRoute = require('./routes/user.route');
var productRoute = require('./routes/product.route');
var authRoute = require('./routes/auth.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var apiProductRoute = require('./api/routes/product.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 3000;

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRETE));
app.use(sessionMiddleware); // co tac dong den tat ca cac duong dan ma chung ta su dung
app.use(csurf({ cookie: true })); // la 1 ham tra ve 1 middleware

app.use('/api/products', apiProductRoute);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/products', productRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, function() {
	console.log('Express listen on port ' + port);
});