const express = require('express');
const router = express.Router();
const db = require('../helper/db');

router.get('/users', (req, res) => {
  db.get()
    .collection('users')
    .find({})
    .toArray()
    .then((users) => {
      console.log('users', users);
    });
});

module.exports = router;
