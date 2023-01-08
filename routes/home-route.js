const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUserById(req.session.userId)
      .then(user => {
        res.render('index', {userByID: user});
      })
      .catch(error => res.send(error))
});

module.exports = router;
