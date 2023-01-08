const express = require('express');
//const { route } = require('./login-route');
const router = express.Router();
const storyQueries = require('../db/queries/stories');
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUserById(req.session.userId)
      .then(user=>{
        res.render('creation', {userByID: user});
      })
      .catch(error => res.send(error))
});

router.post('/', (req, res)=> {
  // login condition missing
  // const user = req.body;
  // user.id = req.session.userId;
  data.id = 1;
  storyQueries.insertStory(data)
    .then(result => {
      console.log(result);
      res.render('index', data.id)
    })
    .catch(err => {
      res
        .status(500)
    });



})
module.exports = router;
