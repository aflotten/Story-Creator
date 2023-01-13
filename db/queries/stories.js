const db = require('../connection');

/**  you need story id , title,username,content,date */
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

const insertStory = (data) => {
  dbParams = [data.id, data.content, data.title];
  return db.query(`INSERT INTO stories (user_id, content, title, time_created, time_completed) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, NULL)RETURNING id;`, dbParams).then((result) => {
    return result.rows[0];
  })
    .catch((err) => {
      console.log(err.message);
    });
};

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

const insertAddition = (data) => {
  dbParams = [data.story_id, data.user_id, data.body];
  return db.query(`INSERT INTO additions (story_id, user_id, body, time_posted, accepted) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, FALSE)RETURNING body; `, dbParams).then((result) => {
    return result.rows[0];
  })
    .catch((err) => {
      console.log(err.message);
    });
};

const removeAddition = (addition_id) => {
  return db.query(`DELETE FROM additions WHERE id = $1`, [addition_id]).then((result) => {
    console.log('test')
    return result.rows[0]
  })
    .catch((err) => {
      console.log(err.message);
    });
};

const removeAllAdditions = (story_id) => {
  return db.query(`DELETE FROM additions WHERE story_id = $1`, story_id).then((result) => {
    return result.rows[0]
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const updateStory = (story_id, body) => {
  const dbParams = [story_id, body]
  return db.query(`UPDATE stories SET content = $2 WHERE stories.id = $1 RETURNING *;`, dbParams).then((result) => {
    return result.rows[0]
  })
    .catch((err) => {
      console.log(err.message);
    });
};

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

