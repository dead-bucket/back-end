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
      let allEntries = {};
      if(req.body.recipient) {
        return Entry.find({userId: req.user.id, recipient: req.body.recipient})
          .then(userEntries => allEntries.userEntries = userEntries)
          .then(() => {
            return Entry.find({userId: req.body.recipient, recipient: req.user.id})
              
          })
          .then(recipientEntries => allEntries.recipientEntries = recipientEntries)
          .then(() => {
            res.status(200).json(allEntries);
          })
          // .then(entrys => res.status(200).json(entrys))
          .catch(err => errorHandler(err, res));
      }
      if(!req.body.recipient) {
        return errorHandler(new Error('objectid failed, no recipient specified'), res);
      }
      
    });
};