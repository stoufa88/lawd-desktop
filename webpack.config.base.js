const path = require('path');

module.exports = {
	target: 'electron',
  module: {
    noParse: [/node_modules\/json-schema\/lib\/validate\.js/, 'ws'],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader?importLoaders=1&limit=100000' },
      { test: /\.vue$/, loader: 'vue' }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js'],
    root: path.resolve('./node_modules/')
  },
  plugins: [

  ],
  externals: [
		'ws',
		'video.js',
		'googleapis'
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]
};
