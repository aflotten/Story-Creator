const express = require('express');
const router  = express.Router();
const storyQueries = require('../db/queries/stories');

router.get('/', (req, res) => {
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

module.exports = router;
