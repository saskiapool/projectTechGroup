const express = require('express');
const db = require('../helper/db');
const mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
const router = express.Router();

router.get('/chat', async (req, res) => {
  if (!req.session.user) {
    res.render('./login.ejs');
    return;
  }

  const id = req.session.user._id;
  const io = req.app.get('socketio');

  // const io = socketio(server);
  // io.use(sharedsession(req.session));

  io.on('connection', (socket) => {
    console.log(`A new client connected: ${socket.id}`);
    const socketRoom = req.session.chatroom;
    socket.join(socketRoom);

    socket.on('message', (data) => {
      const sender = req.session.user._id;

      const databaseData = {
        sender: sender,
        content: data.message,
        time: new Date(),
      };

      // send to database
      db.get()
        .collection('chats')
        .updateOne(
          {
            _id: ObjectId(socketRoom),
          },
          { $push: { messages: databaseData } }
        );

      console.log(`sending to ${socketRoom}, message: ${data.message}`);
      socket.to(socketRoom).emit('message', data.message);
    });

    socket.on('disconnect', () => {
      console.log('Client has disconnected');
    });
  });

  const chats = await db
    .get()
    .collection('chats')
    .find({
      participants: {
        $in: [id],
      },
    })
    .toArray();

  console.log(chats);

  if (chats.length > 0) {
    req.session.chatroom = await chats[0]._id;
    console.log(`chatroom session: ${req.session.chatroom}`);
    chats.clientid = id;

    let x = [];
    for (const i of chats) {
      console.log(i.participants);
      if (!x.includes(i.participants[0])) {
        x.push(ObjectId(i.participants[0]));
      }

      if (!x.includes(i.participants[1])) {
        x.push(ObjectId(i.participants[1]));
      }
    }
    console.log(x);

    const users = await db
      .get()
      .collection('users')
      .find({
        _id: { $in: x },
      })
      .toArray();

    res.render('./chat.ejs', { data: chats });
  } else {
    res.render('./chat.ejs', { data: {} });
    // res.render('index.ejs', { data: {}, data2: {} });
  }
});

router.post('/chat', (req, res) => {
  if (req.body.message.trim() != '') {
    const sender = req.session.user._id;

    const databaseData = {
      sender: sender,
      content: req.body.message.trim(),
      time: new Date(),
    };

    // send to database
    db.get()
      .collection('chats')
      .updateOne(
        {
          _id: ObjectId(req.session.chatroom),
        },
        { $push: { messages: databaseData } }
      );

    console.log(`A new message has been send: ${req.body.message}`);
    res.redirect('/chat');
  }
});

module.exports = router;
