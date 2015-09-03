'use strict';

var mongoose = require('mongoose');

var host = 'localhost';
var port = 27017;
var db = 'testing';
var uri = 'mongodb://' + host + ':' + port + '/' + db;
var dbConn = null;

function connect() {
  mongoose.connect(uri, {}, onConnection);
}

function onConnection() {
  dbConn = mongoose.connection;

  if (!dbConn) {
    throw new Error('Failed to connected db: ' + uri);
  }

  console.log('Mongoose connected to: %s', uri);

  dbConn.on('error', errorHandler);
}

function errorHandler(err) {
  console.error('Error on connection: %s with error: %s', uri, err)
}

exports.connect = connect;
exports.dbConn = dbConn;
