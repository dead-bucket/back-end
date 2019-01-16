'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Entry = require('../model/entriesModel');
const bearerAuth = require('../lib/bearer-auth-middleware');


module.exports = router => {
  router.route('/deliverentries/')
    
  
    .put(bearerAuth, bodyParser, (req, res) => {
      if(!req.body.recipient) {
        return errorHandler(new Error('validation failed, no recipient id specified'), res);
      }
      console.log('user info', req.user.id , req.body.recipient);
      Entry.updateMany({userId: req.user.id, recipient: req.body.recipient}, {delivered: true})
        .then(results => {
          console.log('results', results);
          if(!results) return Promise.reject(new Error('Authorization error'));
                  
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
  
    
  

};