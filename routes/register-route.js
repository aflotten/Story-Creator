const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  res.render('register');
});

// router.post('/', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   // if (!getUserByEmail(email) {
//     db.
//   //})
//   console.log(email);
//   console.log(password);
//   res.render('index')
// });

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
    res.send("Successfully added user!");
  })
  .catch(error => res.send(error))
});

module.exports = router;
