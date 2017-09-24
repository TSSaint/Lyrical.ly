require('isomorphic-fetch');
require('dotenv').config();
// npm module - lyricist
const Lyricist = require('lyricist');

const lyricist = new Lyricist(process.env.API_KEY);

function getResults(req, res, next) {
  let title = req.query.search;
  fetch(`http://api.genius.com/search?access_token=${process.env.API_KEY}&q=${title}`)
    .then(fetchRes => fetchRes.json())
    .then(jsonRes => {
      console.log('JSON response', jsonRes)
      res.locals.songs = jsonRes.response;
      return next();
    }).catch(err => {
      console.log(err);
      return next();
    });
}


async function getLyrics(id) {
  const song = await lyricist.song(id, {
    fetchLyrics: true,
    textFormat: 'html',
  });
  return song.lyrics;
}

async function getSingle(req, res, next) {
  let id = req.query.id;
  res.locals.lyrics = await getLyrics(id);
  fetch(`http://api.genius.com/songs/${id}/?access_token=${process.env.API_KEY}`)
  .then(fetchRes => fetchRes.json())
  .then(jsonRes => {
    console.log('JSON RES', jsonRes)
    res.locals.single = jsonRes.response;
    return next();
  }).catch(err => {
    console.log(err);
    return next();
  });
}

module.exports = {
  getResults,
  getSingle,
}
