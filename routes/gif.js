const express = require('express');
const db = require('../helper/db');
const mongo = require('mongodb');
const ObjectId = mongo.ObjectID;
const router = express.Router();
const https = require('https');

router.post('/gif', async (req, res) => {
  let gifUrl = '';
  if (req.body.gif) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_APIKEY}&limit=5&q=${req.body.gif}`;

    https.get(url, (response) => {
      response.setEncoding('utf8');
      let body = '';
      response.on('data', (data) => {
        body += data;
      });
      response.on('end', () => {
        body = JSON.parse(body);
        console.log(body);
        // console.log(body.data[0].images.downsized.url);
        gifUrl = body.data[0].images.downsized.url;
        // res.render('./chat.ejs', { data: gifUrl });
        res.render('./chat.ejs', { chats: {}, users: {} });
      });
    });

    // const url = await fetch(
    //   `api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_APIKEY}&limit=5&q=${req.body.gif}`
    // );
    // console.log(url);
  }
});

module.exports = router;
