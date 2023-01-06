const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // if (!getUserByEmail(email) {
    db.
  //})
  console.log(email);
  console.log(password);
  res.render('index')
});

module.exports = router;
