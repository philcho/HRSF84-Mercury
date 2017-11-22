import {expect} from 'chai';
import request from 'supertest';

import {app} from '../server';

describe('Server', () => {
  it('should respond with status 200 when GET is sent to /template', (done) => {
    request(app)
      .get('/template')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  }); 
});

