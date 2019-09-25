'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Entry = require('../model/entriesModel');
const bearerAuth = require('../lib/bearer-auth-middleware');


module.exports = router => {

  router.route('/targetentry/')
    .post(bearerAuth, bodyParser, (req, res) => {
      // this will return an array of objects that match the target 
      let allEntries = {};
      if(req.body.recipient) {
        return Entry.find({userId: req.user.id, recipient: req.body.recipient}).sort({createdAt: -1})
          .then(userEntries => {
            allEntries.userEntries = userEntries;
          })
          .then(() => {
            res.status(200).json(allEntries);
          })
          .catch(err => errorHandler(err, res));
      }
      if(!req.body.recipient) {
        return errorHandler(new Error('objectid failed, no recipient specified'), res);
      }
      
    });
};