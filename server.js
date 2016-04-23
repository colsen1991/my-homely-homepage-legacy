const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const publicRouter = require('./server/api/routers/public');
const secureRouter = require('./server/api/routers/secure');
const errorMiddleware = require('./server/middleware/error');
const wadsworth = require('./server/logging/wadsworth');
const db = require('./server/db/db');

process.env.NODE_ENV = JSON.stringify(process.argv[2]);

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

httpsApp.use('/js', express.static(`${__dirname}/web/js`));
httpsApp.use('/img', express.static(`${__dirname}/web/img`));
httpsApp.use('/api', publicRouter);
httpsApp.use('/api/secure', secureRouter);
httpsApp.get('*', (req, res) => res.sendFile(`${__dirname}/web/index.html`));
httpsApp.use(errorMiddleware);

db.connect(httpsApp.get('dbConfig'));

const httpsServer = https.createServer(httpsApp.get('credentials'), httpsApp);

httpsServer.listen(443, () => {
  const host = httpsServer.address().address;
  const port = httpsServer.address().port;

  wadsworth.logInfo(`Node server listening at https://${host}:${port}`);
});


const httpApp = express();

httpApp.get('*', (req, res) => res.redirect(`https://localhost${req.url}`));

const httpServer = http.createServer(httpApp);

httpServer.listen(80, () => {
  const host = httpServer.address().address;
  const port = httpServer.address().port;

  wadsworth.logInfo(`Node server listening at http://${host}:${port}`);
});
