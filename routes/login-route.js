const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login')
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  res.render('index')
});

module.exports = router;
