const db = require('../connection');

/**  you need story id , title,username,content,date */
const getStories = () => {
  return db.query(
    `SELECT stories.id as id,title,  name ,  TO_CHAR(time_created,'DD Mon YY') as date ,content FROM stories
    JOIN users ON users.id = user_id;  `)
    .then(data => {
      return data.rows;
    }).catch (err => {
      return console.log("Error with query:", err)
    });
};

const getAdditions = (id) => {
  return db.query(
    `SELECT name ,body FROM stories
    JOIN users ON users.id = user_id
    JOIN additions ON stories.id = story_id
    WHERE stories.id = $1;
      `, [id])
    .then(data => {
      return data.rows;
    }).catch (err => {
      return console.log("Error with query:", err)
    });
};
const getStory = (id) => {
  return db.query(
    `SELECT stories.id as id,title,  name ,  TO_CHAR(time_created,'DD Mon YY') as date ,content FROM stories
    JOIN users ON users.id = user_id
    WHERE stories.id = $1;  `,[id])
    .then(data => {
      return data.rows;
    }).catch (err => {
      return console.log("Error with query:", err)
    });
};
const addStory = (data) =>{
  dbParams =[data.id,data.content,data.title]
  return db.query(`INSERT INTO stories (user_id, content, title, time_created, time_completed) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, NULL)RETURNING id`,dbParams).then((result) => {
    return result.rows[0]
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports ={ getStories,getStory,getAdditions,addStory};
