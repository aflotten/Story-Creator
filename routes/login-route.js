const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login')
});

<<<<<<< HEAD
=======
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  res.render('index')
});

>>>>>>> 2ccf18250a77dffe5165e1e1a9625ea231c2e35d
module.exports = router;
