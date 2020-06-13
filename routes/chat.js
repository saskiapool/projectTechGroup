const express = require('express');
const router = express.Router();

router.get('/chat', (req, res) => {
  req.session.user ? res.render('./chat.ejs') : res.render('./login.ejs');
});

module.exports = router;
