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
  let gifUrl = '';

  const id = req.session.user._id;

  const chats = await db
    .get()
    .collection('chats')
    .find({
      participants: {
        $in: [id],
      },
    })
    .toArray();

  if (chats.length > 0) {
    req.session.chatroom = chats[0]._id;
    console.log(`chatroom session: ${req.session.chatroom}`);
    chats[0].clientid = id;

    const x = [];
    for (const i of chats) {
      console.log(i.participants);
      for (const y of i.participants) {
        console.log(y);
        if (y != id) {
          x.push(ObjectId(y));
        }
      }
    }

    const users = await db
      .get()
      .collection('users')
      .find({
        _id: { $in: x, $ne: ObjectId(req.session.user._id) },
      })
      .toArray();

    // console.log(users);
    console.log(gifUrl);
    res.render('./chat.ejs', { chats: chats[0], users: users, gifUrl: gifUrl });
  } else {
    res.render('./chat.ejs', { chats: {}, users: {}, gifUrl: gifUrl });
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

router.post('/changeChat', async (req, res) => {
  const userId = req.body.changeChat;
  const id = req.session.user._id;
  console.log(userId);

  // get messages
  const chat = await db
    .get()
    .collection('chats')
    .findOne({
      participants: {
        $all: [userId, req.session.user._id],
      },
    });

  chat.clientid = id;
  req.session.chatroom = chat._id;

  // get sidebar
  const chats = await db
    .get()
    .collection('chats')
    .find({
      participants: {
        $in: [id],
      },
    })
    .toArray();

  const x = [];
  for (const i of chats) {
    console.log(i.participants);
    for (const y of i.participants) {
      console.log(y);
      if (y != id) {
        x.push(ObjectId(y));
      }
    }
  }

  const users = await db
    .get()
    .collection('users')
    .find({
      _id: { $in: x, $ne: ObjectId(req.session.user._id) },
    })
    .toArray();

  res.render('./chat.ejs', { chats: chat, users: users });
});

module.exports = router;
