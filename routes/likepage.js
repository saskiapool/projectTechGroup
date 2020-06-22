const express = require('express');
const db = require('../helper/db');
const router = express.Router();
const mongo = require('mongodb');
const ObjectId = mongo.ObjectID;

router.get('/like', async (req, res) => {
  if (req.session.user) {
    const users = await db
        .get()
        .collection('users')
        .find({_id: {$ne: ObjectId(req.session.user._id)}})
        .toArray();

    const index = await db
        .get()
        .collection('users')
        .findOne({_id: ObjectId(req.session.user._id)});

    // convert date to age
    if (users.length > index.number ) {
      dob = new Date(users[index.number].age);
      const today = new Date();
      const age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));

      if (age) {
        users[index.number].age = age;
      } else {
        users[index.number].age = 'Timeless';
      }
    }

    res.render('./liken.ejs', {data: users[index.number]});
  }
});

// When form gets posted
router.post('/like', async (req, res) => {
  if (req.body.id) {
    db.get()
        .collection('users')
        .updateOne(
            {
              _id: ObjectId(req.session.user._id),
            },
            {
              $inc: {number: 1},
              $push: {
                likes: req.body.id,
              },
            },
        );
    req.session.user.likes.push(req.body.id);

    if (
      req.session.user.likes.length > 0 ||
      req.session.user.megalikes.length > 0
    ) {
      const likedUser = await db
          .get()
          .collection('users')
          .findOne({_id: ObjectId(req.body.id)});

      if (likedUser.likes.includes(req.session.user._id)) {
        const data = {
          participants: [req.session.user._id, `${likedUser._id}`],
          messages: [],
        };
        db.get().collection('chats').insertOne(data);
        console.log(`Chat toegevoegd met ${data.participants} `);
      }
    }
    res.redirect('./like');
  }
});


router.post('/megalike', async (req, res) => {
  if (req.body.id) {
    db.get()
        .collection('users')
        .updateOne(
            {
              _id: ObjectId(req.session.user._id),
            },
            {
              $inc: {number: 1},
              $push: {
                megalikes: req.body.id,
              },
            },
        );
    req.session.user.megalikes.push(req.body.id);

    if (
      req.session.user.likes.length > 0 ||
      req.session.user.megalikes.length > 0
    ) {
      const likedUser = await db
          .get()
          .collection('users')
          .findOne({_id: ObjectId(req.body.id)});

      if (likedUser.likes.includes(req.session.user._id)) {
        const data = {
          participants: [req.session.user._id, `${likedUser._id}`],
          messages: [],
        };
        db.get().collection('chats').insertOne(data);
        console.log(`Chat toegevoegd met ${data.participants} `);
      }
    }
    res.redirect('./like');
  }
});


router.post('/dislike', async (req, res) => {
  if (req.body.id) {
    db.get()
        .collection('users')
        .updateOne(
            {
              _id: ObjectId(req.session.user._id),
            },
            {
              $inc: {number: 1},
            },
        );
    if (
      req.session.user.likes.length > 0 ||
          req.session.user.megalikes.length > 0
    ) {
      const likedUser = await db
          .get()
          .collection('users')
          .findOne({_id: ObjectId(req.body.id)});

      if (likedUser.likes.includes(req.session.user._id)) {
        const data = {
          participants: [req.session.user._id, `${likedUser._id}`],
          messages: [],
        };
        db.get().collection('chats').insertOne(data);
        console.log(`Chat toegevoegd met ${data.participants} `);
      }
    }
    res.redirect('./like');
  }
});

module.exports = router;
