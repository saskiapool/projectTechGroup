const express = require('express');
const router = express.Router();
const db = require('../helper/db');
const session = require('express-session')

const app = express()
app.use(session({
  'secret': '343ji43j4n3jn4jk3n'
}))

router.get('/questionOne', (req, res) => {
  req.session.user
   ? res.render('./questionOne.ejs')
   : res.render('./questionOne.ejs');
  // res.render('./questionOne.ejs');
});

router.post('/questionOne', async (req, res) => {
  const data = {
    questionO: req.body.questionO,
  };

  db.get().collection('questions').insertOne(data);
  console.log(`added ${data} to the database`);

  res.redirect('/questionTwo');
});

module.exports = router;
