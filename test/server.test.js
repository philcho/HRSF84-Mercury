import {expect} from 'chai';
import request from 'supertest';

import {app} from '../server';

describe('Server', () => {
  describe('Bundle requests path', () => {
    it('should respond with status 200 when GET is sent to /*.bundle.js', (done) => {
      request(app)
        .get('/profile.bundle.js')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Profile requests path', () => {
    it('should respond with status 200 when GET is sent to /profile/id', (done) => {
      request(app)
        .get('/profile/id')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 
  });

  describe('Event requests path', () => {
    it('should respond with status 200 when GET is sent to /event/id', (done) => {
      request(app)
        .get('/event/id')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    // Add test for POST to /addEvent without modifying the db

    it('should respond with status 200 when GET is sent to /getAllEvents', (done) => {
      request(app)
        .get('/getAllEvents')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 
  });

  describe('Superlative requests path', () => {
    it('should respond with status 200 when GET is sent to /superlative/name', (done) => {
      request(app)
        .get('/superlative/name')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    // Add test for POST to /addSuperlative without modifying the db
    
    it('should respond with status 200 when GET is sent to /getAllSuperlatives', (done) => {
      request(app)
        .get('/getAllSuperlatives')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    it('should respond with status 200 when POST is sent to /getParticularSuperlative', (done) => {
      request(app)
        .post('/getParticularSuperlative')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Student path', () => {
    it('should respond with status 200 when GET is sent to /students', (done) => {
      request(app)
        .get('/students')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    // Add test for POST to /addStudent without modifying the db

    it('should respond with status 200 when GET is sent to /getAllStudents', (done) => {
      request(app)
        .get('/getAllStudents')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with status 404 when body-less GET is sent to /getStudent/id', (done) => {
      request(app)
        .get('/getStudent/id')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    // Add test for successful POST to /getParticularStudent without modifying the db

    it('should respond with status 404 when body-less POST is sent to /getParticularStudent', (done) => {
      request(app)
        .get('/getParticularStudent')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 
  });

  describe('Superlative requests path', () => {
    // Add test for successful POST to /addShoutout without modifying the db
  
    it('should respond with status 200 when GET is sent to /getAllShoutouts', (done) => {
      request(app)
        .get('/getAllShoutouts')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with status 200 when POST is sent to /getParticularShoutout', (done) => {
      request(app)
        .post('/getParticularShoutout')
        .field('shoutoutInfo', JSON.stringify({_id: '5a0ddad5b218d0cadf73eeff'}))
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 
  });
});

