'use strict';

const faker = require('faker');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1`;
const testUser = {'username': 'hick', 'password':'dick'};
let token;

describe('Sign up route', () => {
  beforeAll(() => server.start());
  beforeAll(() => {
    return superagent.get(`${api}/signin`)
      .auth('mandy', 'south')
      .then(res => {
        token = res.body;
        console.log('token', token);
      })
      .catch(err => console.error(err));
  });
  afterAll(() => server.stop());


  describe('valid new target', () => {
    beforeAll(() => {
      return superagent.post(`${api}/target/`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'tessa',
        })
        .then(res => {
          this.response = res;
        })
        .catch(err => console.error(err));
    });
    it('should return a 201 status code', () => {
      expect(this.response.status).toBe(201);
    });
    it('should have a object in the response body', () => {
      expect(this.response.body).toBeInstanceOf(Object);
    });
  });

  
  
});