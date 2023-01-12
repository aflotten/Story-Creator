const db = require('../connection');

// addLike query for inserting into database w/ specfic user/additions id
const addLike = (addition_id, user_id) => {
  console.log(addition_id, user_id);
  const queryString = `INSERT INTO likes (addition_id, user_id) VALUES ($1, $2)RETURNING *;`;
  return db.query(queryString, [addition_id, user_id]);
};

// Query to retrieve total number of likes given specific id
const getLikes = (addition_id) => {
  const queryString = `SELECT COUNT(*) FROM likes WHERE addition_id = $1;`;
  return db.query(queryString, [addition_id]);
};

// Query to determine if user has already liked the addition
const checkLike = (addition_id, user_id) => {
  const queryString = `SELECT id FROM likes WHERE addition_id = $1 AND user_id = $2;`;
  return db.query(queryString, [addition_id, user_id]);
};


module.exports = { addLike, getLikes, checkLike };
