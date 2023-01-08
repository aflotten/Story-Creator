const express = require('express');
const router = express.Router();

//logs the user out by deleting the user_id cookie
router.post("/", (req, res) => {
  req.session = null;
  return res.redirect("/login");
});

module.exports = router;
