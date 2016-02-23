const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const publicRouter = require('./server/api/routers/public');
const secureRouter = require('./server/api/routers/secure');
const notFoundMiddleware = require('./server/middleware/notFound');
const errorMiddleware = require('./server/middleware/error');
const webpackConfig = require('./webpack.config.babel');
const wadsworth = require('./server/logging/wadsworth');
const db = require('./server/db/db');

const app = express();
const compiler = webpack(webpackConfig);

app.set('dbConfig', JSON.parse(fs.readFileSync('./server/config/db.json')));
app.set('credentials', {
  cert: fs.readFileSync('./server/config/ssl/certificate.dev.cert'),
  key: fs.readFileSync('./server/config/ssl/private_key.dev.key')
});

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(`${__dirname}/web/index.html`));
app.use('/public', express.static(`${__dirname}/public`));
app.use('/api', publicRouter);
app.use('/api/secure', secureRouter);
app.use('*', notFoundMiddleware);
app.use(errorMiddleware);

db.connect(app.get('dbConfig'));

app.server = https.createServer(app.get('credentials'), app);

app.server.listen(8443, () => {
  const host = app.server.address().address;
  const port = app.server.address().port;

  wadsworth.logInfo(`Node server listening at http://${host}:${port}`);
});
