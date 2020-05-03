let rooms = ["Default", "Private"];

angular.module('login', ['ngResource', 'loginService']).
  controller('LoginController', function ($scope, loginService) {
    $scope.login = function () {
      if($scope.nickName && $scope.room){
        console.log('entrou')
        let data = { userName: $scope.nickName, room: $scope.room }
        sessionStorage.setItem('data', JSON.stringify(data));
  
        loginService.setUserChat(data)
  
        window.location = "/chat";
        $scope.nickName = null;
        $scope.room = null;
      }

      return;
    }
  });

$(function () {
  var $window = $(window);

  $window.keydown(function (event) {
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      var userName = document.querySelector('#nickName');
      var room = document.querySelector('#room');

      if (userName.value != undefined && userName.value != "" && room.value != undefined && room.value != "") {
        userName.value = "";
        room.value = "";
        window.location = "/chat";
      }
    }
  });
});

function showHideNewRoom(newRoom) {
  let btnNewRom = document.querySelector('#btnNewRom');

  if (newRoom.style.display == "none") {
    newRoom.style.display = "block";
    newRoom.style.display = "inline-block";
    newRoom.focus();
    btnNewRom.style.display = "block";
    btnNewRom.style.display = "inline-block";
  } else {
    newRoom.style.display = "none";
    btnNewRom.style.display = "none";
  }
}

document.querySelector('#addRoom').addEventListener('click', function() {
  let newRoom = document.querySelector('#newRoom');
  showHideNewRoom(newRoom);
});

document.querySelector('#btnNewRom').addEventListener('click', function(event) {
  event.preventDefault();
  let newRoom = document.querySelector('#newRoom');
  let rooms = document.querySelector('#rooms');
  let option = document.createElement('option');
  let spNewRoom = document.querySelector('#spNewRoom');

  option.text = newRoom.value;
  rooms.add(option);

  spNewRoom.innerText = newRoom.value;

  newRoom.value = '';

  let checkNewRoom = document.querySelector('#addRoom');
  checkNewRoom.checked = false;

  var modal = document.querySelector('#modalRoom');
  modal.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  showHideNewRoom(newRoom);
});

document.getElementsByClassName("close")[0].addEventListener('click', function () {
  var modal = document.querySelector('#modalRoom');
  modal.style.display = "none";
});
