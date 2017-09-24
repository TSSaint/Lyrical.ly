// require const Song
const Song = require('../models/song');

// set empty object favoritesController
const favoritesController = {};

// set favoritesController show
favoritesController.show = (req, res) => {
  Song.findById(req.params.id)
    .then(song => {
      res.render('user/user-song-single', {
        currentPage: 'show',
        message: 'ok',
        song: song,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

// set favoritesController create
favoritesController.create = (req, res) => {
  Song.create({
    genius_id: req.body.genius,
    title: req.body.title,
    artist: req.body.artist,
    album_image: req.body.album,
    user: req.user,
  }, req.user.id).then(() => {
    res.redirect('/user');
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

// set favoritesController update
favoritesController.update = (req, res) => {
  Song.update({
    title: req.body.title,
    artist: req.body.artist,
  }, req.params.id).then(song => {
    res.redirect(`/user/$req.params.id}`);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
};

// set favoritesController edit
favoritesController.edit = (req, res) => {
  Song.findById(req.params.id)
    .then(song => {
      res.render('user/user-song-edit', {
        currentPage: 'edit',
        song: song,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

// set favoritesController delete
favoritesController.delete = (req, res) => {
  Song.destroy(req.params.id)
    .then(() => {
      res.redirect('/user');
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = favoritesController;
