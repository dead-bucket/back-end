'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Entry = require('../model/entriesModel');
const bearerAuth = require('../lib/bearer-auth-middleware');


module.exports = router => {

  router.route('/targetentry/')
    .get(bearerAuth, bodyParser, (req, res) => {
      // console.log('target route get', req.body.recipient);
      // this will retuyrn an array of objects that match the target 
      if(req.body.recipient) {
        // console.log('in find one GET route by recipient');
        return Entry.find({userId: req.user.id || req.body.recipient, recipient: req.body.recipient || req.user.id})
        // return Entry.find({userId: (req.user.id || req.body.recipient), recipient: (req.user.id || req.body.recipient)})
          .then(entrys => res.status(200).json(entrys))
          .catch(err => errorHandler(err, res));
      }
      if(!req.body.recipient) {
        return errorHandler(new Error('objectid failed, no recipient specified'), res);
      }
      
    });
};