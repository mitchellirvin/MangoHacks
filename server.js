'use strict';

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
var server = app.start();
var express = require('express');
var	app = express();
var bodyParser = require('body-parser');


//connect to mongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');


//configure app for bodyParser()
//allows us to get data from a POST

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 


// Routes for our API
// ----------------------------------

var router = express.Router();

// test route, localhost:8080/api
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!'});
});

// more routes to come

// register the routes, all prefixed w/ /api
app.use('/api', router);

// Start server
// --------------------------------------
app.listen(port);
console.log('Magic is happening on port: ' + port);