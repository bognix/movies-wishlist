var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({

  title: String,
  keywords: Array
});


module.exports = mongoose.model('Movie', MovieSchema);
