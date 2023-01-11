const express = require('express');
//const { route } = require('./login-route');
const router = express.Router();
const storyQueries = require('../db/queries/stories');
const userQueries = require('../db/queries/users');



router.get('/', (req, res) => {
  const ID = req.params.id;
  if (req.session.userId) {
    res.redirect('/')
  } else {
    
  }
})
module.exports = router;

