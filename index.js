require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./helper/db');

const http = require('http');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// const session = require('express-session');

// app.io = require('socket.io');

// const app = require('express')();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
const io = require('socket.io').listen(server);
// const socketio = require('socket.io');
// const sharedsession = require('express-socket.io-session');
// const io = socketio(server);
// io.use(sharedsession(session));

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('socketio', io);

app.use(require('./routes/routes'));

// realtime chat
// io.on('connection', (socket) => {
//   console.log(`A new client connected: ${socket.id}`);
// });

// io.on('connection', (socket) => {
//   console.log(`A new client connected: ${socket.id}`);
//   // });
//   const socketRoom = socket.handshake.session.chatroom;
//   socket.join(socketRoom);

//   socket.on('message', (data) => {
//     const sender = socket.handshake.session.user._id;

//     const databaseData = {
//       sender: sender,
//       content: data.message,
//       time: new Date(),
//     };

//     // send to database
//     // db.collection('chats').updateOne(
//     //   {
//     //     _id: ObjectId(socketRoom),
//     //   },
//     //   { $push: { messages: databaseData } }
//     // );

//     socket.to(socketRoom).emit('message', data.message);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client has disconnected');
//   });
// });

db.connect(() => {
  server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
