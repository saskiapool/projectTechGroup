const express = require('express');
const router = express.Router();

// Routes
const index = require('./index');
const users = require('./users');
const liken = require('./likepage');
const error = require('./error');

router.use('/', index);
router.use('/', users);
router.use('/', liken);
router.use('/', error);

module.exports = router;
