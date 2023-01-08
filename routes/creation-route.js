const express = require('express');
//const { route } = require('./login-route');
const router = express.Router();
const storyQueries = require('../db/queries/stories');
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUserById(req.session.userId)
      .then(user => {
        res.render('creation', {userByID: user});
      })
      .catch(error => res.send(error))
});

router.post('/', (req, res)=> {
  userQueries.getUserById(req.session.userId)
      .then(user => {
        const data = req.body
        data.id = user.id
        storyQueries.insertStory(data)
          .then(result => {
            console.log(result);
            res.render('index', {userByID: user})
          })
          .catch(err => {
            res
              .status(500)
          });
            })
})

module.exports = router;
