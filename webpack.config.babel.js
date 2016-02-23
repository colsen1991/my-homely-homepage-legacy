const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './web/js/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'web', 'js'),
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'web', 'css'),
        loader: 'style-loader!css-loader!'
      },
      {
        test: /\.styl$/,
        include: path.join(__dirname, 'web', 'css'),
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
