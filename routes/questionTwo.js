const express = require('express');
const router = express.Router();
const db = require('../helper/db');

router.get('/questionTwo', (req, res) => {
  req.session.user ?
  res.render('./questionTwo.ejs') :
  res.render('./login.ejs');
});

router.post('/questionTwo', async (req, res) => {
  const data = {
    questionT: req.body.questionT,
  };

  console.log(`post question one data: ${data}`);

  db.get().collection('questions').insertOne(data);
  console.log(`added ${data} to the database`);
  res.redirect('/questionThree');
});

module.exports = router;

