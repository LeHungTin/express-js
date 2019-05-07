var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');

// app.get('/', function(request, response) {
// 	response.send('Hello World');
// });

// app.get('/users', function(request, response) {
// 	response.send('users list');
// });

var users = [
  		{id: 1, name: 'Tin'},
  		{id: 2, name: 'Quang'}
  	];

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/users', function (req, res) {
  res.render('users/index', {
  	users: users
  });
});

app.get('/users/search', function (req, res) {
	var q = req.query.q;
	var matchedUsers = users.filter(function(user) {
  		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  	});

  res.render('users/index', {
  	users: matchedUsers
  });
});

app.get('/users/create', function (req, res) {
  res.render('users/create');
});

app.post('/users/create', function (req, res) {
 	users.push(req.body);
 	res.redirect('/users');
});

app.listen(port, function() {
	console.log('Express listen on port ' + port);
});