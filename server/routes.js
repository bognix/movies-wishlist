module.exports = function(app, router) {
  // var Movie = require('../models/movie');

  // getAllMovies = function(req, res) {
  //   Movie.find(function(err, movies) {
  //     if (err) {
  //       res.send(err);
  //     }
  //     res.json({movies: movies});
  //   });
  // };


  router.get('/', function(req, res) {
    // getAllMovies(req, res)
    res.json({movies: {}});
  });

  app.use('/api/movies', router);
};
