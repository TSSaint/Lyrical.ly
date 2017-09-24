// require express
// initialize songs

const express = require('express');
const songsRouter = express.Router();

// helpers
const songsHelper = require('../services/songs/songs-helpers');
const songsController = require('../controllers/songs-controller');

// add URI paths
songsRouter.get('/', songsHelper.getResults, songsController.index);
songsRouter.get('/:id', songsHelper.getSingle, songsController.show);

module.exports = songsRouter;

