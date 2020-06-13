const express = require('express');
const db = require('../helper/db');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('./register.ejs');
});

router.post('/register', async (req, res) => {
  const psw = req.body.psw;
  const psw2 = req.body.psw2;

  // compare password
  if (psw !== psw2) {
    console.log('passwords do not match');
    res.redirect('/register');
    return;
  }

  // see if user already exists
  const email = req.body.email;

  let user = await db.get().collection('users').findOne({
    email: email,
  });

  if (typeof user == null) {
    console.log('mail already in database');
    res.redirect('/register');
    return;
  }

  // add to database
  let data = {
    name: req.body.secondname,
    mid: req.body.middlename,
    surname: req.body.surname,
    email: email,
    gender: req.body.gender,
    age: req.body.age,
    psw: psw,
    psw2: psw2,
    likes: [],
  };

  db.get().collection('users').insertOne(data);
  console.log(`added ${email} to the database`);
  res.redirect('/login');
});

module.exports = router;
