'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Entry = require('../model/entriesModel');
const bearerAuth = require('../lib/bearer-auth-middleware');
const User = require('../model/userModel');

module.exports = router => {
  router.route('/deliverentries/')
    
  
    .put(bearerAuth, bodyParser, (req, res) => {
      if(!req.body.recipient) {
        return errorHandler(new Error('validation failed, no recipient id specified'), res);
      }
      console.log('user info', req.user.id , req.body.recipient);
      Entry.updateMany({userId: req.user.id, recipient: req.body.recipient, deliverOn: {'$lte': Date.now()}}, {delivered: true})
        .then(results => {
          console.log('results', results);
          if(!results) return Promise.reject(new Error('Authorization error'));
                  
        })
        .then(() => {
          //this finds the recipient of the messages and pushes the
          //senders id into the reciepients new message array 
          return User.find({_id: req.body.recipient})
            .then(user => {
              // console.log('new message array', user[0].newmessages);
              if(!user[0].newmessages.includes(`${req.user.id}`)) {
                // console.log('in if statement pushing new message', user);
                user[0].newmessages.push(`${req.user.id}`);
              }
              return user[0].save();
            })
            .catch(err => console.log(err));
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
  
    
  

};