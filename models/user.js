const db = require('../db/config');

// creates an instance of user
const User = {};

// add method findByUserName
User.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [userName]);
};

// add method create
User.create = user => {
  return db.one(`
    INSERT INTO users
    (username, email. password_digest)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [user.username, user.email, user.password_digest]);
};

// add method findUserSongs
User.findUserSongs = id => {
  return db.manyOrNone(`
    SELECT * FROM songs
    WHERE user_id = $1
  `, [id]);
};

module.exports = User;
