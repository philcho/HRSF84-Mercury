const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const path = require('path');

const compiler = webpack(webpackConfig);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

// Path for the page
app.get('/template', (req, res, next) => {
  // send the html file for that page
  res.sendFile(path.join(__dirname + '/dist/template.html'));
});

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`----- Server listening on http://localhost:${PORT} -----`);
});
