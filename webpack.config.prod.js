const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./web/js/index.jsx'],
  output: {
    path: path.join(__dirname, 'build', 'web', 'js'),
    filename: 'app.jsx'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'web', 'js'),
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2']
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
        loader: 'file?name=../img/[path][name].[ext]&context=./web/img'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new CopyWebpackPlugin([
      {
        from: 'server.js',
        to: '../..'
      },
      {
        from: 'server',
        to: '../../server'
      },
      {
        from: 'web/index.html',
        to: '..'
      },
      {
        from: 'web/error.html',
        to: '..'
      }
    ])
  ],
  node: {
    fs: 'empty'
  }
};
