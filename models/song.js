const db = require('../db/config');

// set empty obj Song
const Song = {};

// add method findbyid
Song.findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM songs
    WHERE id = $1
  `, [id]);
}

// add method create to add songs
Song.create = (song, userid) => {
  return db.one(`
    INSERT INTO songs
    (genius_id, title, artist, album_image, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [song.genius_id, song.title, song.artist, song.album_image, userid]);
}

// add method update to add songs
Song.update = (song, id) => {
  return db.one(`
    UPDATE songs set
    title = $1,
    artist = $2
    WHERE id = $3
    RETURNING *
  `, [song.title, song.artist, id]);
}

// add method destroy to add songs
Song.destroy = (id) => {
  return db.none(`
    DELETE FROM songs
    WHERE id = $1
  `, [id]);
}

module.exports = Song;
