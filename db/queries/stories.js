const db = require('../connection');

// Query to retrieve all stories
const getStories = () => {
  return db.query(
    `SELECT stories.id as id,title,  name ,  TO_CHAR(time_created,'Mon DD') as date ,content,time_completed FROM stories
    JOIN users ON users.id = user_id;  `)
    .then(data => {
      return data.rows;
    }).catch(err => {
      return console.log("Error with query:", err);
    });
};

// Query to retrieve a story based on the story id
const getStory = (id) => {
  return db.query(
    `SELECT stories.id as id,title,  name ,  TO_CHAR(time_created,'Mon DD') as date ,content,time_completed,user_id FROM stories
    JOIN users ON users.id = user_id
    WHERE stories.id = $1;
    `, [id])
    .then(data => {
      return data.rows;
    }).catch(err => {
      return console.log("Error with query:", err);
    });
};
// Query to retrieve all stories based on the user id
const getStoriesById = (id) => {
  return db.query(
    `SELECT stories.id as id,title,  name ,  TO_CHAR(time_created,'Mon DD') as date ,content,time_completed FROM stories
    JOIN users ON users.id = user_id
    WHERE users.id = $1;
    `, [id])
    .then(data => {
      return data.rows;
    }).catch(err => {
      return console.log("Error with query:", err);
    });
};
//  Add a new story
const insertStory = (data) => {
  dbParams = [data.id, data.content, data.title];
  return db.query(`INSERT INTO stories (user_id, content, title, time_created, time_completed) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, NULL)RETURNING id;`, dbParams).then((result) => {
    return result.rows[0];
  })
    .catch((err) => {
      console.log(err.message);
    });
};
// Query to retrieve all additions based on a story id
const getAdditions = (id) => {
  return db.query(
    `SELECT (SELECT COUNT(*) FROM likes WHERE addition_id = $1) as likes, additions.id as id, name, body, TO_CHAR(time_posted,'Mon DD') as date FROM additions
    JOIN users ON users.id = user_id
    JOIN stories ON stories.id = story_id
    WHERE stories.id = $1;
    `, [id])
    .then(data => {
      return data.rows;
    }).catch(err => {
      return console.log("Error with query:", err);
    });
};
//Add a new additions for a story
const insertAddition = (data) => {
  dbParams = [data.story_id, data.user_id, data.body];
  return db.query(`INSERT INTO additions (story_id, user_id, body, time_posted, accepted) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, FALSE)RETURNING body; `, dbParams).then((result) => {
    return result.rows[0];
  })
    .catch((err) => {
      console.log(err.message);
    });
};
// Delete an additions based on it's id
const removeAddition = (addition_id) => {
  return db.query(`DELETE FROM additions WHERE id = $1`, [addition_id]).then((result) => {
    return result.rows[0];
  })
    .catch((err) => {
      console.log(err.message);
    });
};
//Delete all additions based on the story_id
const removeAllAdditions = (story_id) => {
  return db.query(`DELETE FROM additions WHERE story_id = $1`, [story_id]).then((result) => {
    return result.rows[0];
  })
    .catch((err) => {
      console.log(err.message);
    });
};
//Make an update to a story based on its id
const updateStory = (story_id, body) => {
  const dbParams = [story_id, body];
  return db.query(`UPDATE stories SET content = $2 WHERE stories.id = $1 RETURNING *;`, dbParams).then((result) => {
    return result.rows[0];
  })
    .catch((err) => {
      console.log(err.message);
    });
};
//Change a stories status from in progress to complete
const completedStory = (story_id) => {
  return db.query(`UPDATE stories
  SET time_completed = CURRENT_TIMESTAMP
  WHERE id = $1;`, [story_id]).then((result) => {
    return result.rows[0];
  })
    .catch((err) => {
      console.log(err.message);
    });
};
// Query to retrieve get an addtions based on it's additions.id
const getAdditionsById = (id) => {
  return db.query(
    `SELECT (SELECT COUNT(*) FROM likes WHERE addition_id = $1) as likes, additions.id as id, name, body FROM additions
    JOIN users ON users.id = user_id
    JOIN stories ON stories.id = story_id
    WHERE additions.id = $1;
    `, [id])
    .then(data => {
      return data.rows;
    }).catch(err => {
      return console.log("Error with query:", err);
    });
};


module.exports = { getStories, getStory, getStoriesById, getAdditions, insertStory, insertAddition, removeAddition, removeAllAdditions,completedStory, updateStory, getAdditionsById };

