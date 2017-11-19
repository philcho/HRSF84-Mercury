const path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry:
    {
      // name of the html file without the extension : name of the load file
      'template': './loadTemplate.js',
      'index': './loadIndex.js',
      'profile': './loadProfile.js',
      'students': './loadStudents.js'
    }
  ,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};
