const express = require('express');
const router = express.Router();
const storyQueries = require('../db/queries/stories');
const userQueries = require('../db/queries/users');
const { getLikes, addLike } = require('../db/queries/likes');

router.get('/:id', (req, res) => {
  const ID = req.params.id;
  userQueries.getUserById(req.session.userId)
      .then(user => {
        res.render('additions', {userByID: user, id: ID});
      })
      .catch(error => res.send(error))
  })

router.post('/:id', (req, res) => {

  const data = {};
  const ID = req.params.id;
  data.user_id = req.session.userId
  data.story_id = ID;
  data.body = req.body.addition;
  if (data.body === '') {
    res.send({error: "Input is blank, please try again."});
  } else {
    storyQueries.insertAddition(data)
    .then(result => {
      console.log(result);
      res.redirect(`${ID}`);
    })
    .catch(err => {
      res
        .status(500)
    });
  }
})

router.get('/likes/:id', async (req, res) => {
  console.log("WE made it here");
  const ID = req.params.id;
  console.log("ID IS HERE:",ID);
  await getLikes(ID)
  .then(resp => {
    console.log("RESP:", resp.rows[0]);
    const numOfLikes = resp.rows[0]
    const {count} = resp.rows[0];
    console.log("HERE IS THE COUNT:", count)
    return res.status(200).json({count});
  })
  .catch(err => (console.log(err)));
})

module.exports = router;
