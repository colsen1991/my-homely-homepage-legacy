'use strict';

var express = require('express');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var path = require('path');
var publicRouter = require('./server/api/routers/publicRouter');
var adminRouter = require('./server/api/routers/adminRouter');
var db = require('./server/db/db');
var serverUtils = require('./server/utils/serverUtils');

function doGetRoot(req, res) {
  res.sendFile(path.resolve(__dirname + '/index.html'));
}

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', doGetRoot);

app.use('/web', express.static('./web'));
app.use('/api', publicRouter);
app.use('/api/admin', adminRouter);
app.use('*', serverUtils.notFoundHandler);
app.use(serverUtils.errorHandler);

app.set('credentials', {
  cert: fs.readFileSync('./server/config/ssl/certificate.cert'),
  key: fs.readFileSync('./server/config/ssl/private_key.key')
});

app.set('dbConfig', JSON.parse(fs.readFileSync('./server/config/db.json')));

var server = https.createServer(app.get('credentials'), app);

server.listen(8443, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Node server listening at http://%s:%s', host, port);

  db.connect(app.get('dbConfig'));
});

exports.app = app;
exports.server = server;
