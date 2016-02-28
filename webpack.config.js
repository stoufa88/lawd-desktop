
var path = require('path')
var webpack = require('webpack')

module.exports = {
  target: 'atom',
  entry: {
    app: './app/app.js',
  },
  output: {
    path: './build',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel!eslint'
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
   resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  }
}
