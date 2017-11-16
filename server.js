const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// This line sets the environment variables, since we are on our local machines
require('dotenv').config();

const db = require('./db/index');

const compiler = webpack(webpackConfig);
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

// =====================
// === Template Path ===
// =====================

// Path for the page
app.get('/template', (req, res, next) => {
  // send the html file for that page
  res.sendFile(path.join(__dirname + '/dist/template.html'));
});

// =========================
// ===== Student Paths =====
// =========================

app.post('/addStudent', (req, res, next) => {
  db.save('student', req.body.student)
    .then((data) => {
      res.end('You saved a new student with the data: ' + JSON.stringify(data, undefined, 2));
    });
});

app.get('/getAllStudents', (req, res, next) => {
  db.loadAll('student')
    .then((data) => {
      res.end('Here is all of our students: \n' + JSON.stringify(data, undefined, 2));
    })
});

app.post('/getParticularStudent', (req, res, next) => {
  // example postman request data
  // {
  //   "studentInfo": {
  //     "_id": "5a0ddac3b218d0cadf73eefb"
  //   }
  // }
  db.loadParticular('student', req.body.studentInfo)
    .then((data) => {
      res.end('Here is the requested student: \n' + JSON.stringify(data, undefined, 2));
    })
});

// =============================
// ===== Superlative Paths =====
// =============================

app.post('/addSuperlative', (req, res, next) => {
  db.save('superlative', req.body.superlative)
    .then((data) => {
      res.end('You saved a new superlative with the data: ' + JSON.stringify(data, undefined, 2));
    });
});

app.get('/getAllSuperlatives', (req, res, next) => {
  db.loadAll('superlative')
    .then((data) => {
      res.end('Here is all of our superlatives: \n' + JSON.stringify(data, undefined, 2));
    })
});

app.post('/getParticularSuperlative', (req, res, next) => {
  // example postman request data
  // {
  //   "superlativeInfo": {
  //     "_id": "5a0ddacbb218d0cadf73eefc"
  //   }
  // }
  db.loadParticular('superlative', req.body.superlativeInfo)
    .then((data) => {
      res.end('Here is the requested superlative: \n' + JSON.stringify(data, undefined, 2));
    })
});

// =======================
// ===== Event Paths =====
// =======================

app.post('/addEvent', (req, res, next) => {
  db.save('event', req.body.event)
    .then((data) => {
      res.end('You saved a new event with the data: ' + JSON.stringify(data, undefined, 2));
    });
});

app.get('/getAllEvents', (req, res, next) => {
  db.loadAll('event')
    .then((data) => {
      res.end('Here is all of our events: \n' + JSON.stringify(data, undefined, 2));
    })
});

app.post('/getParticularEvent', (req, res, next) => {
  // example postman request data
  // {
  //   "eventInfo": {
  //     "_id": "5a0ddad0b218d0cadf73eefe"
  //   }
  // }
  db.loadParticular('event', req.body.eventInfo)
    .then((data) => {
      res.end('Here is the requested event: \n' + JSON.stringify(data, undefined, 2));
    })
});

// ==========================
// ===== Shoutout Paths =====
// ==========================

app.post('/addShoutout', (req, res, next) => {
  // example postman request data
  // {
  //   "shoutout": {
  //     "category": "quote",
  //     "text": "We should do a yearbook",
  //     "name": "Vi"
  //   }
  // }

  db.save('shoutout', req.body.shoutout)
    .then((data) => {
      res.end('You saved a new shoutout with the data: ' + JSON.stringify(data, undefined, 2));
    })
});

app.get('/getAllShoutouts', (req, res, next) => {
  db.loadAll('shoutout')
    .then((data) => {
      res.end('Here is all of our shoutouts: \n' + JSON.stringify(data, undefined, 2));
    })
});

app.post('/getParticularShoutout', (req, res, next) => {
  // example postman request data
  // {
  //   "shoutoutInfo": {
  //     "_id": "5a0ddad5b218d0cadf73eeff"
  //   }
  // }
  db.loadParticular('shoutout', req.body.shoutoutInfo)
    .then((data) => {
      res.end('Here is the requested shoutout: \n' + JSON.stringify(data, undefined, 2));
    })
});

// ==================
// ===== Listen =====
// ==================

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`----- Server listening on http://localhost:${PORT} -----`);
});
