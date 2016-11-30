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
      loader: 'babel',
      exclude: /node_modules/,
      test: /\.js[x]?$/,
      query: {
        // cacheDirectory: true,
        presets: ['es2015', 'stage-0']
      }
    }],
    eslint: {
        configFile: './.eslintrc'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  }
};

//# sourceMappingURL=webpack.config.js.map

