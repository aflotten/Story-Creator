const express = require('express');
const router  = express.Router();
const storyQueries = require('../db/queries/stories');

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
module.exports = router;
