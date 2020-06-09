const express = require('express');
const router = express.Router();
const db = require('../helper/db');

// Routes
const index = require('./index');
const users = require('./users');
const error = require('./error');

router.use('/', index);
router.use('/', users);
router.use('/', error);

module.exports = router;
