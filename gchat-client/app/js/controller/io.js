angular.module('io.service', []).
  factory('io', function($http){
    var socket,
      ioServer,
      ioRoom,
      watches = {};

    return {
      init: function(conf){
        ioServer = conf.ioServer;
        ioRoom = conf.ioRoom;

        socket = io.connect(conf.ioServer);
        
        socket.on('response', function(data){
          if (data.data.room === ioRoom) {
            return watches['message'](data);
          } 
        });

        socket.on('subscribed', function(data){
           if(data.room === ioRoom) {
            return watches['subscribed'](data);
           }
        });

        socket.on('unsubscribed', function(data){
          if(data.room === ioRoom) {
           return watches['unsubscribed'](data);
          }
        });
      },

      subscribe: function(data){
        socket.emit('subscribe', data);
      },

      unsubscribe: function(data){
        socket.emit('unsubscribe', data);
      },

      emit: function(data){
        socket.emit('message', data);
      },

      watch: function(item, data){
        watches[item] = data;
      },

      unWatch: function(item){
        delete watches[item];
      }
    };
  });
