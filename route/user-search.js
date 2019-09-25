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
      
      if(req.query.email) {
        if(!validateEmail(req.query.email)) return errorHandler(new Error('validation failed, not a valid email format'), res);
        
        return User.find({email: req.query.email})
          .then(entry => {
            if (entry.length > 0) {
              res.status(200).json(entry);
            } else {
              res.status(404).json(`no user with email ${req.query.email} exists`);
            }
          })
          .catch(err => errorHandler(err, res));
      }

      if(!req.query.email) return errorHandler(new Error('validation failed, no email specified'), res);
       
  
    });
};