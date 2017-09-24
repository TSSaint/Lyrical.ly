// Hello World! This is Lyrical.ly

// Initialize packages
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

var app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());

// Code below activates auth requires
// app.use(session({
//   secret: process.env.SECRET_KEY,
//   resave: false,
//   saveUninitialized: true,
// }));

app.use(passport.initialize());
app.use(passport.session());

// refer to public folder
app.use(express.static(path.join(__dirname, 'public')));

// refer to views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Lyrical.ly listening on port ${port}`);
});

// set routes here
const indexRoute = require('./routes/index-route');
app.use('/', indexRoute);
const songsRoutes = require('./routes/songs-routes');
app.use('/songs', songsRoutes);
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const usersRoutes = require('./routes/users-routes');
app.use('/user', usersRoutes);

// error handler
app.get('*', (req, res) => {
    res.status(404).send('not found!');
});
