const db = require('../connection');

const addLike = (addition_id, user_id) => {
  const queryString = `INSERT INTO likes (addition_id, user_id) VALUES ($1, $2 RETURNING *;`
  return db.query(queryString, [addition_id, user_id])
};

const getLikes = (addition_id) => {
  const queryString = `SELECT COUNT(*) FROM likes WHERE addition_id = $1;`
  return db.query(queryString, [addition_id])
};
