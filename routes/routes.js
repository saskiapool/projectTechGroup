const express = require('express');
const router = express.Router();

// Routes
const index = require('./index');
const login = require('./login');
const register = require('./register');
const dashboard = require('./dashboard');
const liken = require('./likepage');
const chat = require('./chat');
const users = require('./users');
const error = require('./error');

router.use('/', index);
router.use('/', login);
router.use('/', register);
router.use('/', dashboard);
router.use('/', liken);
router.use('/', users);
router.use('/', chat);
router.use('/', error);

module.exports = router;
