'use strict';

var mongoose = require('mongoose');

var host = 'localhost';
var port = 27017;
var db = 'testing';
var uri = 'mongodb://' + host + ':' + port + '/' + db;

exports.connect = function connect() {
  mongoose.connection.on('open', function () {
    console.log('Mongoose connected to: %s', uri);
  });

  mongoose.connection.on('error', function (err) {
    throw new Error('Error occured on DB: ' + uri + '\nError:' + err);
  });

  mongoose.connect(uri);
};
