
// const superagent = require('superagent');
// const server = require('../../lib/server');
// require('jest');

// let port = process.env.PORT;
// let api = `:${port}/api/v1`;

// let token, testTarget;

// describe('Sign up route', () => {
//   beforeAll(() => server.start());
//   beforeAll(() => {
//     return superagent.get(`${api}/signin`)
//       .auth('mandy', 'south')
//       .then(res => {
//         token = res.body;
//         // console.log('token in entries route signin', token);
//       })
//       .then(() => {
//         return superagent.get(`${api}/target/`)
//           .set('Authorization', `Bearer ${token}`)
//           .then(res => {
//             testTarget = res.body[0]._id;
//             // console.log('targets', testTarget);
//           })
//           .catch(err => console.error(err));
//       })
//       .catch(err => console.err(err));
//   });
//   afterAll(() => server.stop());

//   describe('valid new entry post', () => {
//     beforeAll(() => {
//       return superagent.post(`${api}/entry/`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           recipient: `${testTarget}`,
//           description: 'test',
//           mood: 'happy',
//         })
//         .then(res => {
//           this.res = res;
//           // console.log('res from entry post', res.body);
//         })
//         .catch(err => console.error(err));
//     });
        
//     it('should create a valid new entry', () => {
//       expect(this.res.status).toEqual(201);
//       expect(this.res.body).toBeInstanceOf(Object);

//     });

//   });
  
// });