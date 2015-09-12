var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title:  String,
    keywords: []
});

module.exports = movieSchema;