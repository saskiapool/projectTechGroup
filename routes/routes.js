const express = require('express');
const router = express.Router();

// Routes
const index = require('./index');
const users = require('./users');
const login = require('./login');
const register = require('./register');
const liken = require('./likepage');
const error = require('./error');

router.use('/', index);
router.use('/', users);
router.use('/', login);
router.use('/', register);
router.use('/', liken);
router.use('/', error);

module.exports = router;
