const express = require('express');
const router = express.Router();
const db = require('../helper/db');

router.get('/questionFour', (req, res) => {
  req.session.user
   ? res.render('./questionFour.ejs')
   : res.render('./questionFour.ejs');
// res.render('./questionOne.ejs');
});

router.post('/questionFour', async (req, res) => {
  const data = {
    questionF: req.body.questionF,
  };

  console.log(`post question one data: ${data}`);

  db.get().collection('questions').insertOne(data);
  console.log(`added ${data} to the database`);
  res.redirect('/chat');
});

module.exports = router;
