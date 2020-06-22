const express = require('express');
const router = express.Router();

// Routes
const login = require('./login');
const register = require('./register');
const dashboard = require('./dashboard');
const liken = require('./likepage');
const chat = require('./chat');
const questionOne = require('./questionOne');
const questionTwo = require('./questionTwo');
const questionThree = require('./questionThree');
const questionFour = require('./questionFour');
const users = require('./users');
const error = require('./error');

router.use('/', login);
router.use('/', register);
router.use('/', dashboard);
router.use('/', liken);
router.use('/', users);
router.use('/', chat);
router.use('/', questionOne);
router.use('/', questionTwo);
router.use('/', questionThree);
router.use('/', questionFour);
router.use('/', error);


module.exports = router;
