const express = require('express');
//const { route } = require('./login-route');
const router = express.Router();
const storyQueries = require('../db/queries/stories');
const userQueries = require('../db/queries/users');



router.get('/', (req, res) => {
  const user_id = req.session.userId;
  if (!user_id) {
    userQueries.getUserById(user_id)
    .then(user => {
      res.render('mystories', {userByID: user});
    })
    .catch(error => res.send(error))
} else {
    userQueries.getUserById(user_id)
    .then(user => {
      res.render('mystories', {userByID: user});
    })
    .catch(error => res.send(error))
}
  })
module.exports = router;

