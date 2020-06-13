const express = require('express');
const db = require('../helper/db');
const session = require('express-session');
const router = express.Router();
const mongo = require('mongodb');
const ObjectId = mongo.ObjectID;

router.get('/like', (req, res) => {
  if (req.session.user) {
    db.get()
      .collection('users')
      .find()
      .toArray((err, data) => {
        res.render('./liken.ejs', { data: data });
      });
  } else {
    res.render('./login.ejs');
  }
});

router.post('/like', (req, res) => {
  console.log(req.body.id);

  db.get()
    .collection('users')
    .updateOne(
      {
        _id: ObjectId(req.session.user._id),
      },
      {
        $push: {
          likes: req.body.id,
        },
      }
    );
  res.redirect('./like');
});

module.exports = router;
