'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./server/router');

var app = express();
app.use('/build', express.static('build'));
app.use(bodyParser.urlencoded({extended: true}));

var server = app.listen(3000, onAppListenSuccess);

function onAppListenSuccess() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('node server listening at http://%s:%s', host, port);

  connectMongooseDB();

  router.setup(app);
}

function connectMongooseDB () {
  mongoose.connect('mongodb://localhost:27017/testing');
  var dbConn = mongoose.connection;

  dbConn.on('error', console.error.bind(console, 'mongoose error'));
  dbConn.on('disconnected', console.log.bind(console, 'mongoose disconnected'));
  dbConn.on('connected', console.log.bind(console, 'mongoose connected'));
}

