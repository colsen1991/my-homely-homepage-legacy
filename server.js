const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./server/api/routers/router');
const db = require('./server/db/db');
const serverUtils = require('./server/utils/serverUtils');

function doGetRoot(req, res) {
  res.sendFile(path.resolve(__dirname + '/index.html'));
}

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', doGetRoot);

app.use('/web', express.static('./web'));
app.use('/api', router);
app.use('*', serverUtils.notFoundHandler);
app.use(serverUtils.errorHandler);

app.set('credentials', {
  cert: fs.readFileSync('./server/config/ssl/certificate.cert'),
  key: fs.readFileSync('./server/config/ssl/private_key.key')
});

app.set('dbConfig', JSON.parse(fs.readFileSync('./server/config/db.json')));

const server = https.createServer(app.get('credentials'), app);

server.listen(8443, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Node server listening at http://%s:%s', host, port);

  db.connect(app.get('dbConfig'));
});

exports.app = app;
exports.server = server;
