const express = require('express');
//const { route } = require('./login-route');
const router = express.Router();
const storyQueries = require('../db/queries/stories');
const userQueries = require('../db/queries/users');



router.get('/', (req, res) => {

  if (!req.session.userId) {
    userQueries.getUserById(req.session.userId)
    .then(user => {
      res.render('mystories', {userByID: user});
    })
    .catch(error => res.send(error))
} else {
    userQueries.getUserById(req.session.userId)
    .then(user => {
      res.render('mystories', {userByID: user});
    })
    .catch(error => res.send(error))
}
  })
module.exports = router;

