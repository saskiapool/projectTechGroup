const express = require('express');
const router = express.Router();
const db = require('../helper/db');

router.get('/questionOne', (req, res) => {
  req.session.user ?
  res.render('./questionOne.ejs') :
  res.render('./login.ejs');
});

router.post('/questionOne', async (req, res) => {
  const data = {
    questionO: req.body.questionO,
  };

  db.get().collection('questions').insertOne(data);
  res.redirect('/questionTwo');
});

module.exports = router;
