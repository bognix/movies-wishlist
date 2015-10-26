var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose');

router.get('/', function (req, res) {
	mongoose.model('Movie').find({}, function (err, movies) {
		if (err) {
			return console.error(err);
		} else {
			res.render('index', { movies: movies});
		}
	});
});

module.exports = router;
