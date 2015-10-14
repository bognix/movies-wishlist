var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

//router.use('/movies', require('./movies'));
//router.use('/users', require('./users'))

router.get('/', function(req, res) {
    mongoose.model('Movie').find({}, function (err, movies) {
      if (err) {
        return console.error(err);
      } else {
        res.send(movies);
      }
    });
});

module.exports = router;
