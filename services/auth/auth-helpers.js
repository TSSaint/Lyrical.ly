// initialize auth
// helper file aids in authentication process
const bcrypt = require('bcryptjs');

// pass in user object
const User = require('../../models/user');

// check if passwords match
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// successful login --> user page
function loginRedirect(req, res, next) {
  if (req.user) return res.redirect('/user');
  return next();
}

// unsuccessful login --> try again
function loginRequired(req, res, next) {
  if (req.user === undefined) return res.redirect('/auth/login');
  return next();
}

// export functions
module.exports = {
  comparePass,
  loginRedirect,
  loginRequired
}
