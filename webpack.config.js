const path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  context: path.join(__dirname, 'src'),
  entry:
    {
      // name of the html file without the extension : name of the load file
      'template': './loadTemplate.js',
      'index': './loadIndex.js',
      'students': './loadStudents.js',
      'profile': './loadProfile.js',
      'events': './loadEvents.js',
      'event-details': './loadEventDetails.js',
<<<<<<< HEAD
      'shoutouts': './loadShoutouts.js',
      'superlatives': './loadSuperlatives.js'
=======
      'superlatives': './loadSuperlatives.js',
      'superlative': './loadSuperlative.js'
>>>>>>> Did more work on superlatives
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
