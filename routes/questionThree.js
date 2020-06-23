const express = require('express');
const router = express.Router();
const db = require('../helper/db');

router.get('/questionThree', (req, res) => {
  req.session.user ?
  res.render('./questionThree.ejs') :
  res.render('./login.ejs');
});

router.post('/questionThree', async (req, res) => {
  const data = {
    questionTh: req.body.questionTh,
  };

  db.get().collection('questions').insertOne(data);
  res.redirect('/questionFour');
});

module.exports = router;
