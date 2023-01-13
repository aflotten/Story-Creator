const express = require('express');
const router  = express.Router();
const storyQueries = require('../db/queries/stories');
const userQueries = require('../db/queries/users')

router.get('/stories', (req, res) => {
  storyQueries.getStories()
    .then(stories => {
      res.json({ stories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id/story', (req, res) => {
  const ID =req.params.id;
  storyQueries.getStory(ID)
    .then(story => {
      res.json( story );
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id/additions', (req, res) => {
  const ID =req.params.id;
  storyQueries.getAdditions(ID)
    .then(additions => {
      res.json({ additions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/mystories', (req, res) => {
  storyQueries.getStoriesById (req.session.userId)
    .then(stories => {
      res.json({ stories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id/additions', (req, res) => {
  const ID = req.params.id;
  const { story_id } = req.body;
  storyQueries.getStory(story_id)
  .then(story => {
    storyQueries.getAdditionsById(ID)
    .then(addition => {
      const newStory = story[0].content + " " + addition[0].body
      storyQueries.updateStory(story_id, newStory)
      .then(result => {
        storyQueries.removeAddition(ID)
        .then(result => {
          userQueries.getUserById(req.session.userId)
            .then(user => {
              res.render('mystories', {userByID: user});
              })
            })
          })
          .catch(err => {
            res.send(err)
      });
    })
  })
});

module.exports = router;
