// require express
// initialize users and favorites

const express = require('express');

// initialize express Router
const userRouter = express.Router();
const usersController = require('../controllers/users-controller');
const favoritesController = require('../controllers/favorites-controller');

// add authhelpers here

// add URI paths
userRouter.get('/:id', favoritesController.show);

module.exports = userRouter;
