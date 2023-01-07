const db = require('../connection');

/**  you need story id , title,username,content,date */
const getStories = () => {
  return db.query(
    `SELECT  stories.id as id,title,  name ,  TO_CHAR(time_created,'DD Mon YY') as date ,content FROM stories
    JOIN users ON users.id = user_id;  `)
    .then(data => {
      return data.rows;
    }).catch (err => {
      return console.log("Error with query:", err)
    });
};


module.exports ={ getStories};
