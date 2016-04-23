const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './web/js/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build', 'web', 'js'),
    filename: 'app.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'web', 'js'),
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2', 'react-hmre']
        }
      },
      {
        test: /\.styl$/,
        include: path.join(__dirname, 'web'),
        loader: 'style!css?modules!stylus'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(ico|png)$/,
        include: path.join(__dirname, 'web', 'img'),
        loader: 'url?name=../img/[path][name].[ext]&context=./web/img'
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  node: {
    fs: 'empty'
  }
};
