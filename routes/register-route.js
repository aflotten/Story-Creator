const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userQueries = require('../db/queries/users');

// Get method for rendering registration page
router.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/')
  } else {
  userQueries.getUserById(req.session.userId)
      .then(user => {
        res.render('login', {userByID: user});
      })
      .catch(error => res.send(error))
  }
});

// Post method for pushing user to DB
router.post('/', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  userQueries.addUser(user)
  .then(user => {
    if(!user) {
      res.send({error: "error adding user"})
      return;
    }
    req.session.userId = user.id;
    userQueries.getUserById(req.session.userId)
      .then(user => {
        res.render('index', {userByID: user});
      })
  })
  .catch(error => res.send(error))
});

module.exports = router;
