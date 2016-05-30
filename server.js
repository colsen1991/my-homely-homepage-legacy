const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
const publicApi = require('./server/api/public');
const secureApi = require('./server/api/secure');
const loggerMiddleware = require('./server/middleware/log');
const wadsworth = require('./server/logging/wadsworth');
const db = require('./server/db/db');

process.env.NODE_ENV = JSON.stringify(process.argv[2]);

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
httpsApp.use(loggerMiddleware.logFile);
httpsApp.use(loggerMiddleware.logConsole);

httpsApp.use('/js', express.static(`${__dirname}/web/js`));
httpsApp.use('/img', express.static(`${__dirname}/web/img`));
httpsApp.use('/api', publicApi);
httpsApp.use('/api/s/', secureApi);
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

httpsServer.listen(443, () => {
  const host = httpsServer.address().address;
  const port = httpsServer.address().port;

  wadsworth.logInfo(`Node server listening at https://${host}:${port}`);
});

// ======================================================================================================================

const httpApp = express();

httpApp.use(loggerMiddleware.logFile);
httpApp.use(loggerMiddleware.logConsole);
httpApp.get('*', (req, res) => res.redirect(`https://${req.host}${req.url}`));

const httpServer = http.createServer(httpApp);

httpServer.listen(80, () => {
  const host = httpServer.address().address;
  const port = httpServer.address().port;

  wadsworth.logInfo(`Node server listening at http://${host}:${port}`);
});
