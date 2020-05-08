const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const cors = require('cors');
const { pushMessage } = require('./services/firebase.js');

app.use(cors({
  origin: [
    'http://localhost:8080',
  ],
  methods: ['GET', 'POST'],
  credentials: true // enable set cookie
}));

fs.readdirSync('./routes').forEach(fileName => {
  fileName = fileName.replace('.js','');
  app.use('/' +fileName , require('./routes/'+ fileName + '.js'));
});

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} listening`);

  socket.on('login', function (obj) {           
    socket.emit('getMessage', {
      type: 'text',
      sender: '系統',
      content: `你好${obj.username}，歡迎使用線上即時聊天功能~`,
      time: Date.now(),
    });
  });

  socket.on('sendMessage', async function (obj) {
    io.emit('getMessage', obj);
    // 若要先等到firebase寫入完畢再群播速度太慢...使用者體驗不好
    pushMessage(obj)
  });

});

server.listen(3000, () => {
  console.log("Server Started. http://localhost:3000");
});