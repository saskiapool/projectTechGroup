const express = require('express');
const db = require('../helper/db');
const router = express.Router();

router.get('/like', (req, res) => {
  if (req.session.user) {
    db.get()
      .collection('users')
      .find({})
      .toArray()
      .then((data) => {
        res.render('./liken.ejs', { data: data });
      });
    //     (err, result) => {
    //       if (err) {
    //         console.log(err);
    //       }
    //       if (result) {
    //         console.log(result);
    //         res.render('./liken.ejs', { data: result });
    //       }
    //     });
    // }
  } else {
    res.render('./login.ejs');
  }
});

// db.get()
// .collection('users')
// .find({})
// .toArray()
// .then((users) => {
//   console.log('users', users);
//   res.render('chat.ejs', { data: users });
// });

module.exports = router;
