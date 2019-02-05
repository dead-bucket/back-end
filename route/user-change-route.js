'use strict';

const User = require('../model/userModel');
const errorHandler = require('../lib/error-handler');
const bearerAuth = require('../lib/bearer-auth-middleware');
const bodyParser = require('body-parser').json();

module.exports = function(router) {
  router.route('/user')
    .get(bearerAuth, (req, res) => {
      User.findOne(req.user._id)
        .then(user => res.status(200).json(user))
        .catch(err => errorHandler(err, res));
    })
    .delete(bearerAuth, (req, res) => {
      // console.log('in delete', req.user._id);
      User.findById(req.user._id)
        .then(User => {
          // console.log('in user remove', User);
          if(User) {
            return User.remove();
          }
          Promise.reject(new Error('objectid failed'));
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err));
    })
    .put(bearerAuth, bodyParser, (req, res) => {

      User.findOne(req.user._id)
        .then(user => {
          // console.log('request', req.body.sortby);
          if(user) {
            user.username = req.body.username ? req.body.username : user.username;
            user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
            user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
            user.email = req.body.email ? req.body.email : user.email;
            user.picture = req.body.picture ? req.body.picture : user.picture;
            user.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : user.phoneNumber;
            user.sortby = req.body.sortby ? req.body.sortby : user.sortby;
          } else {
            Promise.reject(new Error('Authorization Failed. No user found'));
          }
          return user.save();
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};



