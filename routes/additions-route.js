const express = require('express');
const router = express.Router();
const storyQueries = require('../db/queries/stories');
const userQueries = require('../db/queries/users');
const { getLikes, addLike, checkLike } = require('../db/queries/likes');
const { count } = require('console');

// Get route for rendering additions page for specific addition id
router.get('/:id', (req, res) => {
  const ID = req.params.id;
  userQueries.getUserById(req.session.userId)
    .then(user => {
      res.render('additions', { userByID: user, id: ID });
    })
    .catch(error => res.send(error));
});

// Post route for adding to additions page
router.post('/:id', (req, res) => {

  const data = {};
  const ID = req.params.id;
  data.user_id = req.session.userId;
  data.story_id = ID;
  data.body = req.body.addition;
  if (data.body === '') {
    res.send({ error: "Input is blank, please try again." });
  } else {
    storyQueries.insertAddition(data)
      .then(result => {
        res.redirect(`${ID}`);
      })
      .catch(err => {
        res
          .status(500);
      });
  }
});

// Post route for sending like query data to database and to front end
router.post('/likes/:id', async(req, res) => {
  const ID = req.params.id;
  const userLike = await checkLike(ID, req.session.userId);
  const count = await getLikes(ID);
  if (userLike.rows.length > 0) {
    return res.json({ message: "OK", count: count.rows[0].count, increment: false });
  }
  addLike(ID, req.session.userId)
    .then(({ response }) => {
      res.json({ count: parseInt(count.rows[0].count) + 1, increment: true });
    })
    .catch(error => console.log("Error with in like query", error));
});

module.exports = router;
