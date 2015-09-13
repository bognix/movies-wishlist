var express = require('express');
var app = express();
var movies = require('./server/routes/apiMovies');
var mongoose = require('mongoose');

//middleware
app.use(express.static('public'));
app.use('/api/movies', movies);

//db
mongoose.connect('mongodb://localhost/movie_wishlist');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Connected to db');
});

//Server
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
