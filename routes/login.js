const express = require('express');
const db = require('../helper/db');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('./login.ejs');
});

router.post('/login', (req, res) => {
  const username = req.body.uname.toLowerCase();
  const password = req.body.psw;

  db.get()
    .collection('users')
    .findOne(
      {
        username: username,
        password: password,
      },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result) {
          req.session.user = result;
          req.session.save((err) => {
            console.log(result);
            // res.redirect('/chats');
            res.redirect('/like');
          });
        } else {
          res.redirect('/login');
        }
      }
    );
});

module.exports = router;
