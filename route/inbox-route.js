'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Entry = require('../model/entriesModel');
const bearerAuth = require('../lib/bearer-auth-middleware');


module.exports = router => {

  router.route('/inbox/')
    .get(bearerAuth, bodyParser, (req, res) => {
     
      // This will return an array with all the entries that have been
      // sent to user from the target. 
     
      if(req.body.sender) {
        return Entry.find({userId: req.body.sender, recipient: req.user.id, delivered: true})
          .then(results => {
            res.status(200).json(results);
          })
          .catch(err => errorHandler(err, res));
      }
      if(!req.body.sender) {
        return errorHandler(new Error('objectid failed, no recipient specified'), res);
      }
      
    });
};