var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({

	title: String,
	keywords: Array
}, {
	collection: 'Movies'
});


module.exports = mongoose.model('Movie', MovieSchema);
