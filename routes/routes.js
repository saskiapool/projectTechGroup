const express = require('express');
const router = express.Router();
const session = require('express-session')({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
  },
});
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(session);

// Routes
const index = require('./index');
const users = require('./users');
const login = require('./login');
const register = require('./register');
const liken = require('./likepage');
const chat = require('./chat');
const error = require('./error');

router.use('/', index);
router.use('/', users);
router.use('/', login);
router.use('/', register);
router.use('/', liken);
router.use('/', chat);
router.use('/', error);

module.exports = router;
