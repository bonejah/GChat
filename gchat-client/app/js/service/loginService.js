'use strict';

angular.module('loginService', []);

angular.module('loginService', []).
  factory('loginService', function(){
  const userChat = {};

  userChat.setUserChat = function(user){
    this.userChat = user;
  }

  userChat.getUserChat = function(){
    return this.userChat;
  }

  return userChat;
});
