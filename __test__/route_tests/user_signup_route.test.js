'use strict';

const faker = require('faker');

const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1`;
console.log('port for server', port);

describe('Sign up route', () => {
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  const test = {'username': faker.internet.userName(), 'password': faker.internet.password(), 'email': faker.internet.email()} ;

  describe('valid sign up and sign in', () => {
    beforeAll(() => {
      console.log('mockdata', test);
      return superagent.post(`${api}/signup`)
        
        .send(test)
        .then(res => {
          this.response = res;
          
        })
        .catch(err => console.error(err));
    });

    it('should have a 200 response', () => {
      expect(this.response.status).toBe(201);
      // expect(true).toBe(true);
    });
  });
});