'use strict'
const webpack = require('webpack')
module.exports = {
  // plugins: [
  //   // fix "process is not defined" error:
  //   // (do "npm install process" before running the build)
  //   new webpack.ProvidePlugin({
  //     process: 'process/browser',
  //   })
  // ],
  // resolve: {
  //   fallback: {
  //     "path": require.resolve("path-browserify"),
  //     "url": require.resolve("url/") ,
  //     "util": require.resolve("util/"),
  //     "assert": require.resolve("assert/") ,
  //     "buffer": false, 
  //     "fs": false,
  //     "tls": false,
  //     "net": false,
  //     "path": false,
  //     "zlib": false,
  //     "http": false,
  //     "https": false,
  //     "stream": false,
  //     "crypto": false,
  //   }
  // },
  entry: ['./src/index.js'],
  
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      },
    ]
  }
}
