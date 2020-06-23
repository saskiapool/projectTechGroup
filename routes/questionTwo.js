const express = require('express');
const router = express.Router();
const db = require('../helper/db');
const session = require('express-session')

const app = express()
app.use(session({
  'secret': '343ji43j4n3jn4jk3n'
}))

router.get('/questionTwo', (req, res) => {
  req.session.user 
   ? res.render('./questionTwo.ejs') 
   : res.render('./questionTwo.ejs');
// res.render('./questionOne.ejs');
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

