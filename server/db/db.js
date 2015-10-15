const mongoose = require('mongoose');
const fs = require('fs');

function connect(dbConfig) {
  const uri = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;

  mongoose.connection.on('open', () => {
    console.log('Mongoose connected to: %s', uri);
  });

  mongoose.connection.on('error', error => {
    throw new Error('Error occured on DB: ' + uri + '\nError:' + error);
  });

  mongoose.connect(uri);
}

exports.connect = connect;
