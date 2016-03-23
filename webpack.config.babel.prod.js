const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    './web/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/web/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: path.join(__dirname, '/node_modules/'),
        include: path.join(__dirname, 'web', 'js')
      },
      {
        test: /\.styl$/,
        exclude: path.join(__dirname, '/node_modules/'),
        loader: 'style!css?modules!stylus'
      },
      {
        test: /\.json$/,
        exclude: path.join(__dirname, '/node_modules/'),
        loader: 'json'
      },
      {
        test: /\.ico$/,
        include: path.join(__dirname, 'web', 'img'),
        exclude: path.join(__dirname, '/node_modules/'),
        loader: 'file-loader?name=web/img/[path][name].[ext]&context=./web/img'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
