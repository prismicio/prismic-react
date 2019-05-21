var webpack = require('webpack'),
    path = require('path'),
    yargs = require('yargs');
 
var libraryName = 'PrismicReactjs',
    fileName = 'prismic-reactjs',
    plugins = [],
    mode = 'development',
    outputFile;
 
if (yargs.argv.p) {
  mode = 'production';
  outputFile = fileName + '.min.js';
} else {
  outputFile = fileName + '.js';
}
 
var config = {
  mode: mode,
  entry: [
    __dirname + '/src/index.js'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  resolve: {
    alias:{
      "@root": path.resolve( __dirname, './src' )
    },
    extensions: ['.js']
  },
  externals: {
  'react': 'react'
  },
  plugins: plugins
};
 
module.exports = config;
