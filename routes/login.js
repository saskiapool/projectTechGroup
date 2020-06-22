const express = require('express');
const db = require('../helper/db');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('./login.ejs');
});

router.get('/login', (req, res) => {
  res.render('./login.ejs');
});

router.post('/login', async (req, res) => {
  const username = req.body.uname.toLowerCase();
  const password = req.body.psw;

  const user = await db.get().collection('users').findOne({email: username});

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.user = user;
      req.session.save((err) => {
        res.redirect('/like');
      });
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
