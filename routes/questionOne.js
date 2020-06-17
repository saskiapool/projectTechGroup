const express = require('express');
const router = express.Router();
const db = require('../helper/db');

router.get('/questionOne', (req, res) => {
  req.session.user
    ? res.render('./questionOne.ejs')
    : res.render('./login.ejs');
  // res.render('./questionOne.ejs');
});

router.post('/questionOne', async (req, res) => {
<<<<<<< HEAD

=======
>>>>>>> 1c41829e75901bc518444774d3d2d728e316d7c0
  const data = {
    questionO: req.body.questionO,
  };

  db.get().collection('questions').insertOne(data);
  console.log(`added ${data} to the database`);

  res.redirect('/questionTwo');
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 1c41829e75901bc518444774d3d2d728e316d7c0
