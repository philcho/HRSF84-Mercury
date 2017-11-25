const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// This line sets the environment variables, since we are on our local machines
// Therefore, in production (or whenever we are hosted on an actual server),
//   this line can be removed along with the .env file
require('dotenv') // same as const dotenv = require('dotenv');
  .config(); // we just want to call .config, not save

const db = require('./db/index.js');
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

// Path for the page
app.get('/template', (req, res, next) => {
  // send the html file for that page
  res.sendFile(path.join(__dirname, 'dist', 'template.html'));
});

// Capture GET requests for *.bundle.js and *.bundle.js.map files first.
// Otherwise, they'll get captured by the more-generic GET requests below (ex: '/profile/:id').
app.get(/.+bundle.js.*/, (req, res, next) => {
  let filename = req.url.split('/')[2];
  // send the bundle.js or bundle.js.map file for that page
  res.sendFile(path.join(__dirname, 'dist', filename));
});

app.get('/students', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'students.html'));
});

app.get('/profile/:id', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'profile.html'));
});

app.get('/events', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'events.html'));
});

app.get('/event/:id', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'event-details.html'));
});

app.get('/shoutouts', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'shoutouts.html'));
});

app.get('/superlatives', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'superlatives.html'));
});

app.get('/superlative/:name', (req, res, next) => {
  console.log('name of superlative:', req.params);
  res.sendFile(path.join(__dirname, 'dist', 'superlative.html'));
});

// =========================
// ===== Student Paths =====
// =========================

app.get('/getAllStudents', (req, res, next) => {
  db.loadAll('student')
    .then((data) => {
      res.send(JSON.stringify(data));
    })
});

app.get('/getStudent:id', (req, res, next) => {
  const id = req.params.id.slice(1);
  db.loadParticular('student', { '_id': id })
    .then((data) => {
      res.send(JSON.stringify(data));
    });
});

// =============================
// ===== Superlative Paths =====
// =============================

app.get('/superlatives', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'superlatives.html'));
});

app.get('/getAllSuperlatives', (req, res, next) => {
  db.loadAll('superlative')
    .then((data) => {
      res.send(JSON.stringify(data));
    })
});


// =======================
// ===== Event Paths =====
// =======================

app.get('/getAllEvents', (req, res, next) => {
  db.loadAll('event')
    .then((data) => {
      res.send(JSON.stringify(data));
    })
});

// ==========================
// ===== Shoutout Paths =====
// ==========================

app.get('/getAllShoutouts', (req, res, next) => {
  db.loadAll('shoutout')
    .then((data) => {
      res.send(JSON.stringify(data));
    })
});

// =========================
// ===== Generic Paths =====
// =========================
//
// Unlike the specific paths, generic path accepts the model type as a part of the request body
// This way the server code doesn't have to have unnecessarily duplicated code

app.post('/add', (req, res, next) => {
  // Example postman requests:
  // -------------------------

  // === Student ===
  /*
  {
    "modelType": "student",
    "data": {
      "name": "Dan",
      "picture": "https://avatars1.githubusercontent.com/u/18223722?s=400&u=4ed26a12635ac37f5f3f95d27c81afe53a4c5ed7&v=4",
      "bio": "I am a Hack Reactor student who focuses on the MERN stack."
    }
  }
  */

  // === Shoutout ===
  /*
  {
    "modelType": "shoutout",
    "data": {
      "category": "quote",
      "text": "My name is Ian",
      "name": "Alan"
    }
  }
  */

  const type = req.body.modelType;
  const data = req.body.data;

  db.save(type, data)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
});

app.post('/getParticular', (req, res, next) => {
  // Example postman request:
  // ------------------------

  // === Student ===
  /*
  {
    "modelType": "student",
    "identifier": {
      "_id": "5a0ddac3b218d0cadf73eefb"
    }
  }
  */


  // === Superlative ===
  /*
  {
    "modelType": "superlative",
    "identifier": {
      "_id": "5a0ddacbb218d0cadf73eefc"
    }
  }
  */

  const modelType = req.body.modelType;
  const identifier = req.body.identifier;

  db.loadParticular(modelType, identifier)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((error) => {
      res.send(error);
    })
});


app.patch('/updateComments', (req, res, next) => {
  // Example postman requests:
  // -------------------------

  // === Student ===
  /*
  {
    "modelType" : "student",
    "identifier": {
      "_id": "5a0cfe51085065bed328591b"
    },
    "comment": {
      "name": "Vi",
      "comment": "I know like 50 languages"
    }
  }
  */

  // === Event ===
  /*
  {
    "modelType" : "event",
    "identifier": {
      "_id": "5a0dd8307bd6aac9c8394636"
    },
    "comment": {
      "name": "Phil",
      "comment": "I can't do sign language correctly because I have crazy old man arthritis"
    }
  }
  */

  const modelType = req.body.modelType;
  const identifier = req.body.identifier;
  const comment = req.body.comment;

  db.updateComments(modelType, identifier, comment)
    .then((arg) => {
      console.log('arg', arg);
      res.send(JSON.stringify(arg));
    })
    .catch((e) => {
      console.log('Error in updating a comment', e);
      res.send('Sorry but the comment was not added...');
    })
}); // end of app.patch('/updateComments'

app.patch('/updateVoteCount', (req, res, next) => {
  /* Example postman request:
  {
    "identifier": {
      "_id": "5a0cfe51085065bed328591b"
    },
    "nomineeName": "Dan"
  }
  */

  db.updateVoteCount(req.body.identifier, req.body.nomineeName)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((e) => {
      console.log('Error in updating vote counts', e);
      res.send('Sorry but the vote was not registered...');
    })
}); // end of app.patch('/updateVoteCount'

// ==================
// ===== Listen =====
// ==================

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`----- Server listening on http://localhost:${PORT} -----`);
});

module.exports = { app };
