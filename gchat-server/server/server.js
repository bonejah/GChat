var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3696;

server.listen(process.env.PORT || port, function () {
  console.log('Server listening at port %d', port);
});

let usersLogged = 0

io.on('connection', function (socket) {
  let currentUserAdded = false;

  console.log('user connected...');
  socket.events = {};

  socket.on('subscribe', function (data) {
    console.log('subscribing to', data);
    console.log(JSON.stringify(data.userName) + ', joined to chat!')
    socket.username = data.userName;
    socket.join(data.room);
    io.emit('subscribed', data);
  });

  socket.on('message', function (data) {
    console.log('send message');
    io.emit('response', data);
  });

  socket.on('unsubscribe', function (data) {
    console.log('unsubscribing to ', data);
    socket.leave(data.room);
    io.emit('unsubscribed', data);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected...');
  });
});
