var express = require('express');
var app = express();
var path = require('path');

var port = 8081;

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));

// app.use(express.static('./public')); VER SE FUNCIONA NESSE MODO

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname + '/chat.html'));
});

app.listen(process.env.PORT || port);
console.log('Server listening at port %d', port);
console.log('http://localhost:%d', port);
