require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./helper/db');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');

const http = require('http');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(session);

app.use(require('./routes/routes'));

db.connect(() => {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
