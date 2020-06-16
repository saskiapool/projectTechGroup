const express = require('express');
const router = express.Router();
const db = require('../helper/db');

router.get('/questionOne', (req, res) => {
  // res.render('./index.ejs');
req.session.user ? res.render('./questionone.ejs') : res.render('./login.ejs');
  // res.render('./questionOne.ejs');
});

router.post('/questionOne', async (req, res) => {
  const answer = req.body.answer;

  const data = {
    yes: req.body.answer,
    no: req.body.answer,
  };

  db.get().collection('questions').insertOne(data);
  console.log(`added ${data} to the database`);
  res.redirect('/chat');


  module.exports = router;
});
