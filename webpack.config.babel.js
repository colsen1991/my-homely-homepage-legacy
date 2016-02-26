const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './web/js/index'
  ],
  output: {
    path: path.join(__dirname, 'web'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'web', 'js')
      },
      {
        test: /\.styl$/,
        loader: 'style!css?modules!stylus'
      } 
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
