// initialize passport
const passport = require('passport');

// init LocalStrategy
const LocalStrategy = require('passport-local').Strategy;

// call passport package
const init = require('./passport');
const User = require('../../models/user');
const authHelpers = require('./auth-helpers');

// empty obj options
const options = {};

// call native func from passport
init();

// call passport and use pre-defined funcs
passport.use(
  new LocalStrategy(options, (username, password, done) => {
    User.findByUserName(username)
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        if (!authHelpers.comparePass(password, user.password_digest)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      }).catch(err => {
        console.log(err);
        return done(err);
      });
  })
);

// export as passport
module.exports = passport;
