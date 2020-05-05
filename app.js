const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} listening`);

  socket.on('login', function (obj) {                
    console.log(obj);
    socket.emit('getMessage', {
      sender: '系統',
      content: `你好${obj.username}，歡迎使用線上即時聊天功能~`,
      time: Date.now(),
    });
  });

  socket.on('sendMessage', function (obj) {
    io.emit('getMessage', {
      sender: obj.sender,
      content: obj.content,
      time: obj.time,
    });
  });

});

server.listen(3000, () => {
  console.log("Server Started. http://localhost:3000");
});