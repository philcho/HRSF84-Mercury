const expect = require('chai').expect;

const server = require('../server');
const db = require('../db');

describe('', () => {
  describe('Empty Test:', () => {
    it('1 should be a number', (done) => {
      expect(typeof 1).to.equal('number');
      done();
    }); 
  });
});

