'use strict';

const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const helpers = require('../helpers');

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: 'tsconfig.json' }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        loader: ['to-string-loader', 'css-loader'],
        exclude: [helpers.root('src/index.html')]
      },

      /**
       * Raw loader support for *.scss files
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
          test: /\.scss$/,
          loader: ['raw-loader', 'sass-loader'],
          exclude: [helpers.root('src/index.html')]
      },
    ]
  },

  plugins: [
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('src'), // location of your src
      {} // a map of your routes
    )
  ]
}
