'use strict';

var path = require('path');

module.exports = {
  entry: {
    bundle: './client/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.js[x]?$/,
      query: {
	cacheDirectory: true,
	presets: ['react', 'es2015']
      }
    }]
  }
};

//# sourceMappingURL=webpack.config.js.map

