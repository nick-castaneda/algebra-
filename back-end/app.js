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
// Second allows you to use url to post, view, delete, etc (rails does
// this automatically)
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Allows us to use the routes files.
var routes = require('./config/routes');
app.use('/', routes) // The '/' binds routes to that root


// Sets the view engine to ejs, now you don't need to include ejs in
// calling the view pages.
app.set('view engine', 'ejs');
app.listen(3000);
console.log("running on port: 3000");

////////////////////////////////////////////////////////////////////////
