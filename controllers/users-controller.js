// for auth
const bcrypt

// initialize User
const User = require('../models/user.js');

// empty object of usersController
const usersController = {};

// set usersController index
usersController.index = (req, res) => {
  console.log('usersController');
  User.findUserSongs(req.user.id)
    .then(songs => {
      res.render('user/user-profile', {
      user: req.user,
      songs: songs,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({err: err});
  });
}

// set usersController create and logic
usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/user');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

module.exports = usersController;
