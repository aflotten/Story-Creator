const express = require('express');
const router = express.Router();

// Get method for displaying login
router.get('/', (req, res) => {
  res.render('login')
});

//post method for sending loggin credentials
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  res.render('index')
});

module.exports = router;
