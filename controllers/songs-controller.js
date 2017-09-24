// set empty object songsController

const songsController = {};

// set songsController index
songsController.index = (req, res) => {
  res.render('songs/songs-index', {
    songs: res.locals.songs,
    currentPage: 'Results'
  });
}

// set songsController show
songsController.show = (req, res) => {
  res.render('songs/songs-single', {
    lyrics: res.locals.lyrics,
    single: res.locals.single,
    currentPage: res.locals.single.song.title_with_featured
  })
}

module.exports = songsController;
