const data = JSON.parse(sessionStorage.getItem('data'));
let $io;

angular.module('gchat', ['ngResource', 'io.service', 'angularMoment', 'loginService']).
  run(function (io) {
    io.init({
      // ioServer: 'http://localhost:3696',
      ioServer: 'https://gchat-serverj.herokuapp.com',
      ioRoom: data.room
    });

    io.subscribe(data, 'subscribe');
  }).

  controller('GChatController', function ($scope, io, moment, loginService) {
    $io = io;
    $scope.date = new moment().format('h:mm a');
    
    $scope.send = function(){
      if($scope.message){
        io.emit({ data: {
          userName: data.userName,
          room: data.room,
          message: $scope.message,
          date: $scope.date
        }
        });
      }
      $scope.message = null;
    }

    $scope.leave = function(){
      io.unsubscribe(data, 'unsubscribe');
      window.location = "/";
    }
    
    io.watch('subscribed', function (data) {
      greetings(data);
    });

    io.watch('message', function (data) {
      message(data);
    });

    io.watch('unsubscribed', function (data) {
      dismiss(data);
    });
  });

  function greetings(data){
    let message = `Welcome ${data.userName} to room ${data.room}!`
    let div = document.createElement('div');
    div.classList.add('greetings');
    div.textContent = message;
    appendMessage(div)
  }

  function message(data){
    let user = `${data.data.userName} - ${data.data.date}`;
    let message = data.data.message;
    let divMain = document.createElement('div');
    let divUser = document.createElement('div');
    let divMessage = document.createElement('div');
    
    divUser.classList.add('userMessage');
    divMessage.classList.add('message');
    divUser.textContent = user;
    divMessage.textContent = message;
    divMain.appendChild(divUser);
    divMain.appendChild(divMessage);
    appendMessage(divMain);
  }

  function dismiss(data){
    let message = `${data.userName} leave room ${data.room}!`;
    let div = document.createElement('div');
    div.classList.add('dismiss');
    div.textContent = message;
    appendMessage(div)
  }

  function appendMessage(message) {
    let ul= document.querySelector('.messages');
    let li = document.createElement('li');
    li.appendChild(message);
    ul.appendChild(li);
    ul.scrollTop = ul.scrollHeight;
  }

  $(function() {
    var $window = $(window);
    $window.keydown(function (event) {
      if (event.key == 13) {
        var message = document.getElementById('message');
        var date = new moment().format('h:mm a');
        
        if (message.value){
          $io.emit({ data: {
              userName: data.userName,
              room: data.room,
              message: message.value,
              date: date
            }
          });
          message.value = "";
          return;
        }
      }
    });
  });  
