// configures the database

const queries = {
  query: (event) => {
    console.log(event.query);
  }
}

// require pg-promise
const pgp = require('pg-promise')(queries);

// create database
let db;

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  db = pgp({
    database: 'lyrics_db',
    port: 5432,
    host: 'localhost',
  });
} else if (process.env.NODE_ENV === 'production') {
  db = pgp(process.env.DATABASE_URL);
}

module.exports.db;
