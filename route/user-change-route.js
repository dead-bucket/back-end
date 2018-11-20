'use strict';

const User = require('../model/userModel');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const basicAuth = require('../lib/basic-auth-middleware');
const bearerAuth = require('../lib/bearer-auth-middleware');

module.exports = function(router) {
  router.route('/user')
    .get(bearerAuth, (req, res) => {
      User.findOne(req.user._id)
        .then(user => res.status(200).json(user))
        .catch(err => errorHandler(err, res));
    })
    .delete(bearerAuth, (req, res) => {
      console.log('in delete', req.user._id);
      User.findById(req.user._id)
        .then(User => {
          console.log('in user remove', User);
          if(User) {
            return User.remove();
          }
          Promise.reject(new Error('objectid failed'));
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err));
    });
};



