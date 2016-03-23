const mongoose = require('mongoose');
const wadsworth = require('../logging/wadsworth');

function connect(dbConfig) {
  const uri = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;

  mongoose.connection.on('open', () => {
    wadsworth.logInfo(`Server connected to: ${uri}`);
  });

  mongoose.connection.on('error', error => {
    throw new Error(`Error occured while connection to DB: ${uri}\nError: ${error}`);
  });

  mongoose.connect(uri);
}

exports.connect = connect;
