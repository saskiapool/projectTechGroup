const express = require('express');
const router = express.Router();

router.get('/questionThree', (req, res) => {
  // res.render('./index.ejs');
  // req.session.user ? res.render('./questionone.ejs') : res.render('./login.ejs');
  res.render('./questionThree.ejs')
});

module.exports = router;
