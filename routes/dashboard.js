const express = require('express');
const db = require('../helper/db');
const router = express.Router();
const mongo = require('mongodb');
const ObjectId = mongo.ObjectID;

router.get('/dashboard', (req, res) => {
  req.session.user ? res.render('./dashboard.ejs', {data: req.session.user}) :
  res.render('./login.ejs');
});

router.post('/logout', async (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

router.post('deleteUser', async (req, res) => {
  try {
    const id = req.session._id;

    // remove user
    db.get()
        .collection('users')
        .deleteOne({_id: ObjectId(id)});

    // remove chats
    db.get()
        .collection('chats')
        .deleteMany({
          participants: {
            $in: [id],
          },
        });

    req.session.destroy();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
