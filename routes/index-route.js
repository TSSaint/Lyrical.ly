// require express
// initialize index

const express = require('express');
const indexRouter = express.Router();

// add authhelper

//
indexRouter.get('/', (req, res) => {
  res.render('index', {
    message: 'Lyrical.ly is getting started.',
    currentPage: 'Lyrical.ly',
    documentTitle: 'Lyrical.ly is Lyrics on Demand',
    subTitle: 'Serving lyrics so you can sing along to your favorites!'
  });
});

module.exports = indexRouter;
