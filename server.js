const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
const ip = require('ip');
const router = require('./server/api/router');
const loggerMiddleware = require('./server/middleware/log');
const wadsworth = require('./server/logging/wadsworth');
const db = require('./server/db/db');

process.env.NODE_ENV = JSON.stringify(process.argv[2]);

const ipAddress = ip.address();

// ======================================================================================================================

const httpsApp = express();

httpsApp.set('dbConfig', JSON.parse(fs.readFileSync('./server/config/db.json')));
httpsApp.set('credentials', {
  cert: fs.readFileSync('./server/config/ssl/certificate.dev.cert'),
  key: fs.readFileSync('./server/config/ssl/private_key.dev.key')
});

if (process.env.NODE_ENV === JSON.stringify('development')) {
  const webpackConfig = require('./webpack.config.dev.js');
  const compiler = require('webpack')(webpackConfig);

  httpsApp.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  httpsApp.use(require('webpack-hot-middleware')(compiler));
}

httpsApp.use(bodyParser.urlencoded({ extended: true }));
httpsApp.use(bodyParser.json());
httpsApp.use(loggerMiddleware);

httpsApp.use('/js', express.static(`${__dirname}/web/js`));
httpsApp.use('/img', express.static(`${__dirname}/web/img`));
httpsApp.use('/api', router);
httpsApp.get('*', (req, res) => res.sendFile(`${__dirname}/web/index.html`));
httpsApp.use((error, req, res, ignore) => { // eslint-disable-line
  wadsworth.logError(error);

  res.status(500);

  if (req.xhr)
    res.json({ error: 'A thing happened...' });
  else
    res.sendFile(path.resolve(`${__dirname}/../../web/error.html`));
});

db.connect(httpsApp.get('dbConfig'));

const httpsServer = https.createServer(httpsApp.get('credentials'), httpsApp);

httpsServer.listen(443, ipAddress, () => {
  const host = httpsServer.address().address;
  const port = httpsServer.address().port;

  wadsworth.logInfo(`Node server listening at https://${host}:${port}`);
});

// ======================================================================================================================

const httpApp = express();

httpApp.use(loggerMiddleware);
httpApp.get('*', (req, res) => res.redirect(`https://${req.host}${req.url}`));

const httpServer = http.createServer(httpApp);

httpServer.listen(80, ipAddress, () => {
  const host = httpServer.address().address;
  const port = httpServer.address().port;

  wadsworth.logInfo(`Node server listening at http://${host}:${port}`);
});
