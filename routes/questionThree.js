const express = require('express');
const router = express.Router();
const db = require('../helper/db');
const session = require('express-session')

const app = express()
app.use(session({
  'secret': '343ji43j4n3jn4jk3n'
}))

router.get('/questionThree', (req, res) => {
  req.session.user 
   ? res.render('./questionThree.ejs')
   : res.render('./questionThree.ejs');
// res.render('./questionOne.ejs');
});

router.post('/questionThree', async (req, res) => {
  const data = {
    questionTh: req.body.questionTh,
  };

  console.log(`post question one data: ${data}`);

  db.get().collection('questions').insertOne(data);
  console.log(`added ${data} to the database`);
  res.redirect('/questionFour');
});

module.exports = router;
