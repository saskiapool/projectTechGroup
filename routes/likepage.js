const express = require('express');
const router = express.Router();

router.get('/like', (req, res) => {
  req.session.user ? res.render('./liken.ejs') : res.render('./login.ejs');
});

module.exports = router;
