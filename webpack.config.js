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
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ],
    loaders: [{
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.js[x]?$/,
      query: {
	cacheDirectory: true,
	presets: ['react', 'es2015']
      }
    }],
    eslint: {
        configFile: './.eslintrc'
    }
  }
};

//# sourceMappingURL=webpack.config.js.map

