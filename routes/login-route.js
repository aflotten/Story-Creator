const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userQueries = require('../db/queries/users');

// Get method for displaying login
router.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/')
  } else {
  // userQueries.getUserById(req.session.userId)
  //     .then(user => {
        res.render('login', {});
      // })
      // .catch(error => res.send(error))
  }
});

// Post method for sending loggin credentials
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.render('login', {error: "Please fill out all appropriate fields" });
    return;
  }
  userQueries.getUserByEmail(email)
  .then(user => {
    if(user === undefined) {
      res.render('login', {error:'User not in database, please register'})
      return;
    } else if (bcrypt.compareSync(password, user.password) !== true) {
      res.render('login', {error:"Password is incorrect, please try again."})
      return;
    } else {
      req.session.userId = user.id;
      userQueries.getUserById(req.session.userId)
      .then(user => {
        res.render('index', {userByID: user});
      })

    }
  })
  .catch(error => res.send(error))
});

module.exports = router;
