const express = require('express');
const router = express.Router();
const storyQueries = require('../db/queries/stories');
router.get('/:id', (req, res) => {
  const ID =req.params.id;
    res.render('additions',{id:ID});
  })



module.exports = router;
