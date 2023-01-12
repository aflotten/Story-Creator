const express = require('express');
const router = express.Router();
const storyQueries = require('../db/queries/stories');
// Get method for displaying login
router.post('/', (req, res) => {
  const userid = req.session.userId;
  if (userid) {
    const {story_id} = req.body;
    storyQueries.getStory(story_id)
      .then(story => {
        //checks if the user logged in is the creator of the story
        if(story[0].user_id === userid){

          storyQueries.completedStory(story_id).then(story =>{

            userQueries.getUserById(userid)
              .then(user => {
                console.log('hello');
                res.render('mystories', {userByID: user});
              })
          }).catch(error => res.send(error))

        }
        else{
          res.redirect('/')
        }

      })

  } else {
    res.redirect('/')
  }
});

module.exports = router;
