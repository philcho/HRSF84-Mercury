import chai, {expect} from 'chai';
import request from 'supertest';
import rewire from 'rewire';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const server = rewire('../server');
const app = server.app;

describe('Server', () => {
  // Stub functions to prevent tests from attempting to write to the database
  // Sinon has its own stub function which might be able to achieve the same result
  const dbStub = {
    save: () => new Promise((res, rej) => res()),
    updateComments: () => new Promise((res, rej) => res()),
    updateVoteCount: () => new Promise((res, rej) => res()),
  };
  server.__set__('db', Object.assign({}, server.__get__('db'), dbStub));

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

    it('should respond with status 200 when event POST sent to /add', (done) => {
      request(app)
        .post('/add')
        .field('modelType', 'event')
        .field('data', JSON.stringify({}))
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          else {
            done();
          }
        });
    });

    it('should respond with status 200 when GET is sent to /getAllEvents', (done) => {
      request(app)
        .get('/getAllEvents')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    it('should respond with data when GET is sent to /getAllEvents', (done) => {
      request(app)
        .get('/getAllEvents')
        .expect((data) => {
          expect(data.res.text).to.exist;
        })
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    it('should respond with status 200 when PATCH is sent to /updateComments', (done) => {
      request(app)
        .patch('/updateComments')
        .field('modelType', 'event')
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

    it('should respond with status 200 when GET is sent to /getAllSuperlatives', (done) => {
      request(app)
        .get('/getAllSuperlatives')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    it('should respond with data when GET is sent to /getAllSuperlatives', (done) => {
      request(app)
        .get('/getAllSuperlatives')
        .expect((data) => {
          expect(data.res.text).to.exist;
        })
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    it('should respond with status 200 when POST is sent to /getParticular', (done) => {
      request(app)
        .post('/getParticular')
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

    it('should respond with status 200 when GET is sent to /getAllStudents', (done) => {
      request(app)
        .get('/getAllStudents')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with data when GET is sent to /getAllStudents', (done) => {
      request(app)
        .get('/getAllStudents')
        .expect((data) => {
          expect(data.res.text).to.exist;
        })
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    it('should respond with status 200 when student POST sent to /add', (done) => {
      request(app)
        .post('/add')
        .field('modelType', 'student')
        .field('data', JSON.stringify({}))
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          else {
            done();
          }
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

    it('should respond with status 404 when body-less POST is sent to /getParticular', (done) => {
      request(app)
        .get('/getParticular')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    it('should respond with status 200 when PATCH is sent to /updateComments', (done) => {
      request(app)
        .patch('/updateComments')
        .field('modelType', 'student')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });


  describe('Superlative requests path', () => {
    it('should respond with status 200 when shoutout POST sent to /add', (done) => {
      request(app)
        .post('/add')
        .field('modelType', 'shoutout')
        .field('data', JSON.stringify({}))
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          else {
            done();
          }
        });
    });
  
    it('should respond with status 200 when GET is sent to /getAllShoutouts', (done) => {
      request(app)
        .get('/getAllShoutouts')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should respond with data when GET is sent to /getAllShoutouts', (done) => {
      request(app)
        .get('/getAllShoutouts')
        .expect((data) => {
          expect(data.res.text).to.exist;
        })
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    it('should respond with status 200 when POST is sent to /getParticular', (done) => {
      request(app)
        .post('/getParticular')
        .field('shoutoutInfo', JSON.stringify({_id: '5a0ddad5b218d0cadf73eeff'}))
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    }); 

    it('should respond with status 200 when PATCH is sent to /updateVoteCount', (done) => {
      request(app)
        .patch('/updateVoteCount')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
});

