'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const sendEmail = require('../lib/send-email');


// const User = require('../model/userModel');
const bearerAuth = require('../lib/bearer-auth-middleware');
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}


module.exports = router => {
  router.route('/sendinvite/')
    
    .get(bearerAuth, bodyParser, (req, res) => {

      // if(!validateEmail(req.body.email)) return Promise.reject(new Error('Validation error'));
      if(req.body.email) {
        if(!validateEmail(req.body.email)) return errorHandler(new Error('validation failed, not a valid email format'), res);
        // console.log('user search email', req.body.email);
        return sendEmail(req)
          .then(data => {
            res.status(200).json(data);
          })
          .catch(err => errorHandler(err, res));
        
          
          
      }
      if(!req.body.email) return errorHandler(new Error('validation failed, no email specified'), res);

    });
};
