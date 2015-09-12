var express = require('express');
var router = express.Router();
//var movieSchema = require('./server/schemas/movieSchema');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title:  String,
    keywords: []
});

router.get('/', function(req, res) {
    var movie = mongoose.model('Movie', movieSchema, 'movie');
    movie.find(function(err, movies) {
        if (err) {
            res.status(500);
            res.send(err);
        }
        res.send(movies);
    });

});

module.exports = router;
