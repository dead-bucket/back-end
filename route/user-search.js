'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');


const User = require('../model/userModel');
const bearerAuth = require('../lib/bearer-auth-middleware');
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}


module.exports = router => {
  router.route('/usersearch/:email?')
    
    .get(bearerAuth, bodyParser, (req, res) => {

      // if(!validateEmail(req.body.email)) return Promise.reject(new Error('Validation error'));
      if(req.params.email) {
        if(!validateEmail(req.params.email)) return errorHandler(new Error('validation failed, not a valid email format'), res);
        // console.log('user search email', req.body.email);
        
        return User.find({email: req.params.email })
          .then(entry => {
            if (entry.length > 0) {
              console.log('user found');
              res.status(200).json(entry);
            } else {
              console.log('no user found');
              res.status(404).json(`no user with email ${req.params.email} exists`);
            }

          })
          .catch(err => errorHandler(err, res));
      }

      if(!req.params.email) return errorHandler(new Error('validation failed, no email specified'), res);
       
  
    });
};