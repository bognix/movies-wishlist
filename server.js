var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var db = require('./models/db');
var movies = require('./models/movie');


// set our port
var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// set the static files location for our Ember application
app.use(express.static(__dirname + '/public'));

//bodyParser Middleware to allow different encoding requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());       // to support JSON-encoded bodies


app.use(require('./server/controllers'));

// startup our app at http://localhost:3000
app.listen(server_port, server_ip_address, function() {
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});


// expose app
exports = module.exports = app;
