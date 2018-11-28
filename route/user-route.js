'use strict';

const User = require('../model/userModel');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const basicAuth = require('../lib/basic-auth-middleware');
const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = function(router) {
  router.post('/signup', bodyParser, (req, res) => {
    let pw = req.body.password;
    delete req.body.password;

    let user = new User(req.body);

    user.generatePasswordHash(pw)
      .then(newUser => newUser.save())
      .then(userRes => userRes.generateToken())
      .then(token => res.status(201).json(token))
      .catch(err => errorHandler(err, res));
  });

  router.get('/signin', basicAuth, (req, res) => {
    
    User.findOne({ username: req.userModelHeader.username })
      .then(user => 
        user
          ? user.comparePasswordHash(req.userModelHeader.password)
          : Promise.reject(new Error('Authorization Failed. Username required.'))
      )
      .then(user => user.updateLogin())
      .then(user => user.generateToken())
      .then(token => res.status(200).json(token))
      .catch(err => errorHandler(err, res));
  });
  
  router.put('/changepassword', bearerAuth, bodyParser, (req, res) => {
      
    User.findOne(req.user._id)
      .then(user => {
        if(user) {
          return user.comparePasswordHash(req.body.oldpassword);
        } else {
          Promise.reject(new Error('Authorization Failed. No user found'));
        }
      })
      .then(userRes => {
        let pw = req.body.newpassword;
        delete req.body.newpassword;
        delete req.body.oldpassword;
        userRes.generatePasswordHash(pw)
          .then( updatedUser => {
            updatedUser.save();
          })
          .then(() => res.sendStatus(204))
          .catch(err => errorHandler(err, res));
      })
      .catch(err => errorHandler(err, res));
        
  });
    
  
};