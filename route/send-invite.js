'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const sendEmail = require('../lib/send-email');


const bearerAuth = require('../lib/bearer-auth-middleware');
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}


module.exports = router => {
  router.route('/sendinvite/')
    
    .post(bearerAuth, bodyParser, (req, res) => {

      if(req.body.email) {
        if(!validateEmail(req.body.email)) return errorHandler(new Error('validation failed, not a valid email format'), res);
        return sendEmail(req)
          .then(data => {
            res.status(200).json(data);
          })
          .catch(err => errorHandler(err, res));
        
          
          
      }
      if(!req.body.email) return errorHandler(new Error('validation failed, no email specified'), res);

    });
};
