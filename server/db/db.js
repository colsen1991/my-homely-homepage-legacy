'use strict';

var mongoose = require('mongoose');
var fs = require('fs');

function connect(dbConfig) {
  var uri = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;

  mongoose.connection.on('open', function () {
    console.log('Mongoose connected to: %s', uri);
  });

  mongoose.connection.on('error', function (error) {
    throw new Error('Error occured on DB: ' + uri + '\nError:' + error);
  });

  mongoose.connect(uri);
}

exports.connect = connect;
