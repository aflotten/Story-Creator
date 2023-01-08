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
const insertStory = (data) =>{
  dbParams =[data.id,data.content,data.title]
  return db.query(`INSERT INTO stories (user_id, content, title, time_created, time_completed) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, NULL)RETURNING id`,dbParams).then((result) => {
    return result.rows[0]
  })
  .catch((err) => {
    console.log(err.message);
  });
}
const getAdditions = (id) => {
  /** this has a weird priotity glitch if the query starts with
   from stories then the user_id will be based off the story
   but with addition its based off additions*/
  return db.query(
    `SELECT name ,body FROM additions
    JOIN users ON users.id = user_id
    JOIN stories ON stories.id = story_id
    WHERE stories.id = $1;
      `, [id])
    .then(data => {
      return data.rows;
    }).catch (err => {
      return console.log("Error with query:", err)
    });
};

const insertAddition = (data) =>{
  dbParams =[data.story_id,data.user_id,data.body]
  return db.query(`INSERT INTO additions (story_id, user_id, body, time_posted, accepted) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, FALSE);`,dbParams).then((result) => {
    return result.rows[0]
  })
  .catch((err) => {
    console.log(err.message);
  });
}
module.exports ={ getStories,getStory,getAdditions,insertStory,insertAddition};
