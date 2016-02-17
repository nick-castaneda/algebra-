////////////////////////////////////////////////////////////////////////

// Give variables to all the npms to make them easier to access.
var express = require('express'); // Express is the core framework
var app = express(); // Function in exress to run application
var bodyParser = require('body-parser'); // Lets you parse data
var logger = require('morgan'); // Logs messages to help you build
var mongoose = require('mongoose'); // Database npm

// This connects the site to the local mongo-db
mongoose.connect('mongodb://localhost/algebra-users');

// Loggs messages for development, as opposed to 'prod' for production
app.use(logger('dev'));

// Allows you to use json and clients like Insomia
app.use(bodyParser.json());

// Allows images to be hosted by the server
app.use(express.static('images'));

// configuring our app to handle CORS requests (Kwak is Gucci)
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
})

// Allows us to use the routes files.
var routes = require('./config/routes');
app.use('/', routes) // The '/' binds routes to that root

// Seed SAT Problems
require('./db/seed.js').seedSatProblems();

// Sets the view engine to ejs, now you don't need to include ejs in
// calling the view pages.
app.set('view engine', 'ejs');
app.listen(3000);
console.log("running on port: 3000");

////////////////////////////////////////////////////////////////////////
