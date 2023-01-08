const express = require('express');
const router = express.Router();
const storyQueries = require('../db/queries/stories');

router.get('/:id', (req, res) => {
  const ID =req.params.id;
    res.render('additions', {id: ID});
  })
/** the way this displays the additions seems clunky and bad
 * it sends the param id to the ejs additions file that puts the value
 * in the hidden input for the j query file display-additions to read
 * then the normal steps
 * try it and see what I mean
 */
router.post('/:id', (req, res) => {

  const data ={};
  const ID =req.params.id;
  //data.story_id,data.user_id,data.body,
  // data.id = req.session.user_id;
  data.user_id = 2;
  data.story_id = ID;
  data.body = req.body.addition;
  console.log(data)
  storyQueries.insertAddition(data)
    .then(result => {
      console.log(result);
      res.render('additions',{id: ID})
    })
    .catch(err => {
      res
        .status(500)
    });



})

module.exports = router;
