module.exports = function(app) {
  var express = require('express');
  var moviesRouter = express.Router();

  moviesRouter.get('/', function(req, res) {
    res.send({
      'movies': [
        {id: 1, title: 'Tomorrowland', keywords: [2015]},
        {id: 2, title: 'Inside Out', keywords: [2015]}
      ]});
  });

  moviesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  moviesRouter.get('/:id', function(req, res) {
    res.send({
      'movies': {
        id: req.params.id
      }
    });
  });

  moviesRouter.put('/:id', function(req, res) {
    res.send({
      'movies': {
        id: req.params.id
      }
    });
  });

  moviesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/movies', moviesRouter);
};
