var path = require('path')
var webpack = require('webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
  target: 'atom',
  entry: {
    app: './app/app.js',
  },
  output: {
    path: './build',
    filename: '[name].js',
  },
	plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
		new ExtractTextWebpackPlugin("styles.css")
  ],
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
      { test: /\.json$/, loader: 'json-loader' },
			{ test: /\.css$/, loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader') },
			{ test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader?importLoaders=1&limit=100000' },
			{ test: /\.scss$/, loaders: ["style", "css", "sass"] }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  }
}
