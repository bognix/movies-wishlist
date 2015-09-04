module.exports = function(app) {
  var express = require('express');
  var movieRouter = express.Router();

  movieRouter.get('/', function(req, res) {
    res.send({
      'movie': []
    });
  });

  movieRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  movieRouter.get('/:id', function(req, res) {
    res.send({
      'movie': {
        id: req.params.id
      }
    });
  });

  movieRouter.put('/:id', function(req, res) {
    res.send({
      'movie': {
        id: req.params.id
      }
    });
  });

  movieRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/movie', movieRouter);
};
