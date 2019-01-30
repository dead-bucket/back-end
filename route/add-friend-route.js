'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const User = require('../model/userModel');
const bearerAuth = require('../lib/bearer-auth-middleware');


module.exports = router => {
  
  router.put('/addfriend/', bearerAuth, bodyParser, (req, res) => {
      
    User.findOne(req.user._id)
      .then(user => {
        if(user) {
          console.log('user before update',user);
          user.friends.push(req.body.friend);
          user.save();
          return user;
        } else {
          Promise.reject(new Error('Authorization Failed. No user found'));
        }
      })
      .then(savedUser => {
        console.log('user after save', savedUser);
        res.status(204).json(savedUser);

      })

      
      .catch(err => errorHandler(err, res));
        
  });

};