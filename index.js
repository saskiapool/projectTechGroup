require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const mongodb = require('mongodb');
// const ObjectId = mongo.ObjectID;
// const session = require('express-session');
// const cookieParser = require('cookie-parser');

const http = require('http');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

let db;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(session);

// Routes
const index = require('./routes/index');
const error = require('./routes/error');

app.use('/', index);
app.use('/', error);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
