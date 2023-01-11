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

router.post('/likes/:id', async (req, res) => {
  const ID = req.params.id;
  console.log(req.session)
  const count = await getLikes(ID);
  addLike(ID, req.session.userId)
  .then(({response}) => {
      res.json(count.rows[0])
    })
    .catch(error => console.log("Error with in like query", error))
})
module.exports = router;
