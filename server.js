const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// This line sets the environment variables, since we are on our local machines
// Therefore, in production (or whenever we are hosted on an actual server), this line can be removed
//   along with the .env file
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

// =====================
// === Template Path ===
// =====================

// Path for the page
app.get('/template', (req, res, next) => {
  // send the html file for that page
  res.sendFile(path.join(__dirname, 'dist', 'template.html'));
});

// Capture GET requests for *.bundle.js and *.bundle.js.map files first. Otherwise, they'll get captured by the more-generic GET requests below (ex: '/profile/:id').
app.get(/.+bundle.js.*/, (req, res, next) => {
  let filename = req.url.split('/')[2];
  // send the bundle.js or bundle.js.map file for that page
  res.sendFile(path.join(__dirname, 'dist', filename));
});

app.get('/profile/:id', (req, res, next) => {
  // send the html file for that page
  res.sendFile(path.join(__dirname, 'dist', 'profile.html'));
});

app.get('/event/:id', (req, res, next) => {
  // send the html file for that page
  res.sendFile(path.join(__dirname, 'dist', 'event-details.html'));
});

// =========================
// ===== Student Paths =====
// =========================

app.post('/addStudent', (req, res, next) => {
  db.save('student', req.body.student)
    .then((data) => {
      res.end(JSON.stringify(data));
    });
});

app.get('/getAllStudents', (req, res, next) => {
  db.loadAll('student')
    .then((data) => {
      res.end(JSON.stringify(data));
    })
});

app.get('/getStudent:id', (req, res, next) => {
  const id = req.params.id.slice(1);
  db.loadParticular('student', { '_id': id })
    .then((data) => {
      res.end(JSON.stringify(data));
    });
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
      res.end(JSON.stringify(data));
    })
});

// =============================
// ===== Superlative Paths =====
// =============================

app.post('/addSuperlative', (req, res, next) => {
  db.save('superlative', req.body.superlative)
    .then((data) => {
      res.end(JSON.stringify(data));
    });
});

app.get('/getAllSuperlatives', (req, res, next) => {
  db.loadAll('superlative')
    .then((data) => {
      res.end(JSON.stringify(data));
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
      res.end(JSON.stringify(data));
    })
});

// =======================
// ===== Event Paths =====
// =======================

app.post('/addEvent', (req, res, next) => {
  db.save('event', req.body.event)
    .then((data) => {
      res.end(JSON.stringify(data));
    });
});

app.get('/getAllEvents', (req, res, next) => {
  db.loadAll('event')
    .then((data) => {
      res.end(JSON.stringify(data));
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
      res.end(JSON.stringify(data));
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
      res.end(JSON.stringify(data));
    })
});

app.get('/getAllShoutouts', (req, res, next) => {
  db.loadAll('shoutout')
    .then((data) => {
      res.end(JSON.stringify(data));
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
      res.end(JSON.stringify(data));
    })
});



// ===============================
// ===== Generic Update Path =====
// ===============================

// Unlike the specific paths, this path accepts the model type as a part of the request body
// This way the server code doesn't have to have unnecessarily duplicated data
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
      res.end(JSON.stringify(data));
    })
    .catch((e) => {
      console.log('Error in updating a comment', e);
      res.end('Sorry but the comment was not added...');
    })
}); // end of app.patch('/updateComments'

// ==================
// ===== Listen =====
// ==================

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`----- Server listening on http://localhost:${PORT} -----`);
});
