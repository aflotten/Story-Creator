const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userQueries = require('../db/queries/users');

// Get method for displaying login
router.get('/', (req, res) => {
  res.render('login')
});

// Post method for sending loggin credentials
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userQueries.getUserByEmail(email)
  .then(user => {
    if(user === undefined) {
      res.send({error: "User undefined"});
      return;
    } else if (bcrypt.compareSync(password, user.password) !== true) {
      res.send({error: "Password is incorrect, please try again."});
      return;
    } else {
      req.session.userId = user.id;
      res.send("Successfully logged in user!");
    }
  })
  .catch(error => res.send(error))
});

module.exports = router;
