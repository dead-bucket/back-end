'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');


const User = require('../model/userModel');
const bearerAuth = require('../lib/bearer-auth-middleware');



module.exports = router => {
  router.route('/usersearch/')
    
    .get(bearerAuth, bodyParser, (req, res) => {
     
      if(req.body.email) {
        return User.find({email: req.body.email })
          .then(entry => {
            if (entry.length > 0) {
              console.log('user found');
              res.status(200).json(entry);
            } else {
              console.log('no user found');
              res.status(404).json(`no user with email ${req.body.email} exists`);
            }

          })
          .catch(err => errorHandler(err, res));
      }

      if(!req.body.email) return Promise.reject(new Error('Validation error'));
  
    });
};