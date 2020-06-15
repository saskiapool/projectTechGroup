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
    req.session.chatroom = chats[0]._id;
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
