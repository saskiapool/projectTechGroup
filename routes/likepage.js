const express = require('express');
const router = express.Router();

router.get('/liken', (req, res) => {
  res.render('./liken.ejs');
});

module.exports = router;
