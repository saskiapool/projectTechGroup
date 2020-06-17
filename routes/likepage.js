const express = require('express');
const db = require('../helper/db');
const session = require('express-session');
const router = express.Router();
const mongo = require('mongodb');
const ObjectId = mongo.ObjectID;

router.get('/like', async (req, res) => {
  if (req.session.user) {
    const users = await db
      .get()
      .collection('users')
      .find({ _id: { $ne: ObjectId(req.session.user._id) } })
      .toArray();
    // console.log(users);

    const index = await db
      .get()
      .collection('users')
      .findOne({ _id: ObjectId(req.session.user._id) });
    // console.log('1 GEBRUIKER LADEN');
    // console.log(users[index.number]);
    res.render('./liken.ejs', { data: users[index.number] });
  }
});

//***************************************//
//******* WHEN FORM GETS POSTED *********//
//***************************************//

router.post('/like', async (req, res) => {
  if (req.body.review === 'like') {
    db.get()
      .collection('users')
      .updateOne(
        {
          _id: ObjectId(req.session.user._id),
        },
        {
          $inc: { number: 1 },
          $push: {
            likes: req.body.id,
          },
        }
      );
    req.session.user.likes.push(req.body.id);
  } else if (req.body.review === 'dislike') {
    db.get()
      .collection('users')
      .updateOne(
        {
          _id: ObjectId(req.session.user._id),
        },
        {
          $inc: { number: 1 },
        }
      );
  } else if (req.body.review === 'megalike') {
    db.get()
      .collection('users')
      .updateOne(
        {
          _id: ObjectId(req.session.user._id),
        },
        {
          $inc: { number: 1 },
          $push: {
            megalikes: req.body.id,
          },
        }
      );
    req.session.user.megalikes.push(req.body.id);
  }

  if (
    req.session.user.likes.length > 0 ||
    req.session.user.megalikes.length > 0
  ) {
    const likedUser = await db
      .get()
      .collection('users')
      .findOne({ _id: ObjectId(req.body.id) });

    console.log('liked user is ');
    console.log(`${likedUser._id}`);

    if (likedUser.likes.includes(req.session.user._id)) {
      const data = {
        participants: [req.session.user._id, `${likedUser._id}`],
        messages: [],
      };
      -db.get().collection('chats').insertOne(data);
      console.log(`Chat toegevoegd met ${data.participants} `);
    }
  }
  res.redirect('./like');
  console.log(req.body.review);
});

module.exports = router;
