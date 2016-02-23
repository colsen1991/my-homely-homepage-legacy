const express = require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const router = require('./server/api/routers/router');
const db = require('./server/db/db');
const serverUtils = require('./server/utils/serverUtils');
const webpackConfig = require('./webpack.config.babel');

const app = express();
const compiler = webpack(webpackConfig);

app.set('dbConfig', JSON.parse(fs.readFileSync('./server/config/db.json')));
app.set('credentials', {
  cert: fs.readFileSync('./server/config/ssl/certificate.dev.cert'),
  key: fs.readFileSync('./server/config/ssl/private_key.dev.key')
});

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/public', express.static(`${__dirname}/public`));
app.use('/api', router);
app.get('/', (req, res) => { res.sendFile(`${__dirname}/public/index.html`); });
app.use('*', serverUtils.notFoundHandler);
//app.use(serverUtils.errorHandler);
app.use(serverUtils.errorHandler);

const server = https.createServer(app.get('credentials'), app);
server.listen(8443, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Node server listening at http://${host}:${port}`);

  db.connect(app.get('dbConfig'));
});
