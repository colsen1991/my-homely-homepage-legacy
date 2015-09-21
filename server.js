'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var router = require('./server/router');
var db = require('./server/db');
var path = require('path');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', doGetRoot);
app.use('/web', express.static('web'));
app.use('/api', router);
app.use('*', notFoundHandler);
app.use(errorHandler);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Node server listening at http://%s:%s', host, port);

  db.connect();
});

function doGetRoot(req, res) {
  res.sendFile(path.resolve(__dirname + '/index.html'));
}

function notFoundHandler(req, res) {
  res.sendStatus(404);
}

function errorHandler(err, req, res) {
  console.error(err.stack);

  res.status(500);
  if (req.xhr) {
    res.send({error: 'A thing happened...'})
  } else {
    res.sendFile(__dirname + '/error.html');
  }
}

