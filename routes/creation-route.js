const express = require('express');
const { route } = require('./login-route');
const router = express.Router();
const storyQueries = require('../db/queries/stories');

router.get('/', (req, res) => {
  res.render('creation');
});
router.post('/',(req,res)=>{
  // login condition missing
  const data =req.body;
  // data.id = req.session.user_id;
  data.id = 1;
  storyQueries.insertStory(data)
    .then(result => {
      console.log(result);
      res.render('index')
    })
    .catch(err => {
      res
        .status(500)
    });



})
module.exports = router;
