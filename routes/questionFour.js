const express = require('express');
const router = express.Router();
const db = require('../helper/db');

router.get('/questionFour', (req, res) => {
  req.session.user ?
  res.render('./questionFour.ejs') :
  res.render('./login.ejs');
});

router.post('/questionFour', async (req, res) => {
  const data = {
    questionF: req.body.questionF,
  };

  db.get().collection('questions').insertOne(data);
  res.redirect('/chat');
});

module.exports = router;
