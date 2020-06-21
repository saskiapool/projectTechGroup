require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./helper/db');
const mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
const axios = require('axios');

const http = require('http');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const socketIo = require('socket.io');
const io = socketIo.listen(server);

const cookieParser = require('cookie-parser');
const session = require('express-session')({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
  },
});

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set('socketio', io);
app.use(session);
const sharedsession = require('express-socket.io-session');
io.use(sharedsession(session));

app.use(require('./routes/routes'));

// realtime chat
io.on('connection', (socket) => {
  console.log(`A new client connected: ${socket.id}`);

  const socketRoom = socket.handshake.session.chatroom;
  console.log(socketRoom);
  socket.join(socketRoom);

  socket.on('message', (data) => {
    const sender = socket.handshake.session.user._id;
    const str = data.message.trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const databaseData = {
      sender: sender,
      content: str,
      time: new Date(),
      media: data.media,
    };

    // send to database
    db.get()
        .collection('chats')
        .updateOne(
            {
              _id: ObjectId(socketRoom),
            },
            {$push: {messages: databaseData}},
        );

    console.log(`sending message: ${data.message} to ${socketRoom}`);
    socket.to(socketRoom).emit('message', str);
  });

  socket.on('gif', async (data) => {
    const sender = socket.handshake.session.user._id;
    const str = data.message.trim();

    const databaseData = {
      sender: sender,
      content: str,
      time: new Date(),
      media: data.media,
    };

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_APIKEY}&limit=5&q=${str}`;

    const response = await axios.get(url);
    const index = Math.floor(Math.random() * response.data.data.length);
    const gifUrl = response.data.data[index].images.downsized.url;
    databaseData.content = gifUrl;
    databaseData.media = 'gif';
    databaseData.content = gifUrl;
    if (!gifUrl) {
      databaseData.content =
            'https://media.giphy.com/media/H7wajFPnZGdRWaQeu0/giphy.gif';
    }

    // send to database
    db.get()
        .collection('chats')
        .updateOne(
            {
              _id: ObjectId(socketRoom),
            },
            {$push: {messages: databaseData}},
        );

    console.log(`sending message: ${data.message} to ${socketRoom}`);
    socket.emit('hello', databaseData.content);
    socket.to(socketRoom).emit('gif', databaseData.content);
  });

  socket.on('disconnect', () => {
    console.log('Client has disconnected');
  });
});

db.connect(() => {
  server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
