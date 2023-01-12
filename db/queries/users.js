const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
    .then(data => {
      return data.rows[0];
    });
};

const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE email = $1;', [email])
    .then(data => {
      return data.rows[0];
    });
};

const addUser = (user) => {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [user.name, user.email, user.password];
  return db.query(queryString, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return console.log("Error with query:", err);
    });
};

module.exports = { getUsers, getUserById, getUserByEmail, addUser };
