var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	fetcher = require('../../helpers/fetcher');


router.get('/', function (req, res) {
	mongoose.model('Movie').find({}, function (err, movies) {
		if (err) {
			return console.error(err);
		} else {
			res.render('index', {movies: movies});
		}
	});
});

router.get('/api/status/:title', function (req, res) {
	fetcher.fetchDataForTitle(req.params.title)
		.then(function (result) {
			res.send(result);
		})
		.catch(function (err) {
			console.error(err);
		});
});

router.get('/status/:title', function (req, res) {
	fetcher.fetchDataForTitle(req.params.title)
		.then(function (result) {
			res.render('status', {result: result});
		})
		.catch(function (err) {
			console.error(err);
		});
});

module.exports = router;
