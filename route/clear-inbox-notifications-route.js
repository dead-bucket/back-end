'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuth = require('../lib/bearer-auth-middleware');
const User = require('../model/userModel');

// this will clear the notification flag from the new messages array of the user.
module.exports = router => {
  router.route('/inboxclearnotification/')
    .put(bearerAuth, bodyParser, (req, res) => {
    
      if (req.body.sender) {
        // console.log('user', req.user);
        if(req.user.newmessages.includes(`${req.body.sender}`)) {
          User.findOne({_id: req.user.id})
            .then(user => {
              let temp = user.newmessages.filter(el => el !== `${req.body.sender}`);
              user.newmessages = temp;
              user.save();
              return;
            })
            .then(() => {
              res.sendStatus(204);
            })
            .catch(err => errorHandler(err, res));
        }
      }
  
      if (!req.body.sender) {
        return errorHandler(
          new Error('objectid failed, no recipient specified'),
          res
        );
      }
    });
};
