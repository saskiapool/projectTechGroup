const express = require('express');
const db = require('../helper/db');
const router = express.Router();

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

module.exports = router;
