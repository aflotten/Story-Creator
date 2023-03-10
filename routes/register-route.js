const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userQueries = require('../db/queries/users');

// Get method for rendering registration page
router.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/');
  } else {
    res.render('register', {});
  }
});

// Post method for pushing user to DB
router.post('/', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  if (!user.name || !user.email || !user.password) {
    res.render('register', { error: "Please fill out all appropriate fields" });
  } else if (userQueries.getUserByEmail(user.email)
    .then(user => {
      if (user) {
        res.render('register', { error: "User email already exists in database. Please login" });
        return;
      } else {
        const user = req.body;
        userQueries.addUser(user)
          .then(user => {
            if (!user) {
              res.render('register', { error: "error adding user" });
              return;
            }
            req.session.userId = user.id;
            userQueries.getUserById(req.session.userId)
              .then(user => {
                res.render('index', { userByID: user });
              });
          })
          .catch(error => res.send(error));
      }
    }));
});

module.exports = router;
