const express = require('express');
const db = require('../helper/db');
const mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
const router = express.Router();

router.get('/users', async (req, res) => {
  const id = req.session.user._id;

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
    for (const y of i.participants) {
      if (y != id) {
        x.push(ObjectId(y));
      }
    }
  }

  const users = await db
      .get()
      .collection('users')
      .find({
        _id: {$in: x, $ne: ObjectId(req.session.user._id)},
      })
      .toArray();

  res.render('./users.ejs', {data: users});
});

module.exports = router;
