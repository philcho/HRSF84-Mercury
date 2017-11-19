const mongoose = require('mongoose');
const Promise = require('bluebird');

// set the promise library for mongoose to be bluebird
mongoose.Promise = Promise;

// The default url only works on local machines
var connectionURL = 'mongodb://localhost/greenfield';

// If there is an environment variable, use that to set the db uri
if ((process.env.DBPLACE !== undefined) && (process.env.DBPLACE !== null)) {
  // mongodb url format
  // mongodb://your_user_namer:your_password@ds119748.mlab.com:19748/local_library

  const logInCredentials = process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@';
  connectionURL = 'mongodb://' + logInCredentials + process.env.DBPLACE;
}

mongoose.connect(connectionURL, { useMongoClient: true });

// ===================
// ===== Schemas =====
// ===================

const StudentPageSchema = mongoose.Schema({
  name: String,
  picture: String, // img url
  bio: String,
  comments: [{ // form filled -> not authenticated
    name: String,
    comment: String
  }]
});

const SuperlativePageSchema = mongoose.Schema({ // each superlative gets its own page
  superlative: String, // superlative = most likely to be particular thing (ex. ax murderer)
  nominees: [{ // form filled
    name: String,
    votes: Number
  }]
});

const EventPageSchema = mongoose.Schema({
  name: { type: String, require: true },
  date: String, // or number (the number of milliseconds since the epoch)
  description: String,
  comments: [{
    name: String,
    comment: String
  }]
});

const ShoutoutsPageSchema = mongoose.Schema({
  category: { type: String, require: true }, // examples: quote, shoutouts to everyone, shoutout to staff, memes, etc.
  text: String,
  image: String, // url to img
  name: String, // person saying this
  target: String // the person this is about (ex.)
});

// ==================
// ===== Models =====
// ==================

const StudentPage = mongoose.model('StudentPage', StudentPageSchema);
const SuperlativePage = mongoose.model('SuperlativePage', SuperlativePageSchema);
const EventPage = mongoose.model('EventPage', EventPageSchema);
const ShoutoutsPage = mongoose.model('ShoutoutsPage', ShoutoutsPageSchema);

// ============================
// ===== Helper Functions =====
// ============================

// a helper function to use the correct model
// returns a model instance with the data
const getModel = (modelType, data) => {
  if (modelType === 'student') {
    return new StudentPage(data);
  } else if (modelType === 'superlative') {
    return new SuperlativePage(data);
  } else if (modelType === 'event') {
    return new EventPage(data);
  } else if (modelType === 'shoutout') {
    return new ShoutoutsPage(data);
  } else {
    console.log('ERROR! This is an unhandled case in the db -> index.js -> getModel');
  }
};

// returns a the model for the functionality
const getModelType = (modelType) => {
  if (modelType === 'student') {
    return StudentPage;
  } else if (modelType === 'superlative') {
    return SuperlativePage;
  } else if (modelType === 'event') {
    return EventPage;
  } else if (modelType === 'shoutout') {
    return ShoutoutsPage;
  } else {
  }
};

// ==============================
// ===== Exported Functions =====
// ==============================

// ======================
// === Save Functions ===
// ======================

const save = (modelType = 'student', data) => {
  return getModel(modelType, data).save()
    .then(function (model) {
      return model;
    })
    .catch((e) => {
      console.log('ERROR!\n  In db.save() when saving a model of type', modelType, '\n', e);
    });
};

// ======================
// === Load Functions ===
// ======================

// identifyier is an object that has the unique key/value pair
const loadParticular = (modelType = 'student', identifier) => {
  return getModelType(modelType).find(identifier).exec()
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log('\nError in \'loadParticular\'');
    })
};

const loadAll = (modelType = 'student') => {
  return getModelType(modelType).find().exec()
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log('\nError in \'loadAll\'');
    });
};

module.exports = { save, loadAll, loadParticular };

