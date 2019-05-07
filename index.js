var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var shortId = require('shortid');

var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('db.json')
var db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()


// app.get('/', function(request, response) {
// 	response.send('Hello World');
// });

// app.get('/users', function(request, response) {
// 	response.send('users list');
// });

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/users', function (req, res) {
  res.render('users/index', {
  	users: db.get('users').value()
  });
});

app.get('/users/search', function (req, res) {
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user) {
  		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  	});

  res.render('users/index', {
  	users: matchedUsers
  });
});

app.get('/users/create', function (req, res) {
  res.render('users/create');
});

app.get('/users/:id', function(req, res) {
  var id = req.params.id;

  var user = db.get('users').find({ id: id }).value();

  res.render('users/view', {
    user: user
  });

});

app.post('/users/create', function (req, res) {
  req.body.id = shortId.generate();
 	db.get('users').push(req.body).write();
 	res.redirect('/users');
});


app.listen(port, function() {
	console.log('Express listen on port ' + port);
});