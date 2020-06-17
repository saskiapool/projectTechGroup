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

router.post('/like', (req, res) => {
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
  }
  res.redirect('./like');
  console.log(req.body.review);
});

module.exports = router;
