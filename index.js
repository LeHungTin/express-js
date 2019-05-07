var express = require('express');
var app = express();
var port = 3000;

// app.get('/', function(request, response) {
// 	response.send('Hello World');
// });

// app.get('/users', function(request, response) {
// 	response.send('users list');
// });

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/users', function (req, res) {
  res.render('users/index', {
  	users: [
  		{id: 1, name: 'Tin'},
  		{id: 2, name: 'Quang'}
  	]
  });
});

app.listen(port, function() {
	console.log('Express listen on port ' + port);
});