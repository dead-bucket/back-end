'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const User = require('../model/userModel');
const Notification = require('../model/notifications');
const bearerAuth = require('../lib/bearer-auth-middleware');


module.exports = router => {
  
  router.put('/addfriend/', bearerAuth, bodyParser, (req, res) => {
    
      
    User.findOne(req.user._id)
      .then(user => {
        if(user) {
          if(!user.friends.includes(req.body.friend)) {
            if(user.notifications.some(item => item.id === req.body.fiend)) {
              let tempNotifications = user.notifications.filter(el => el._id !== req.body.friend);
              user.notifications = tempNotifications;
            }
            user.friends.push(req.body.friend);
            user.save();
            return user;

          } else {
            return user;
          }
        } else {
          Promise.reject(new Error('Authorization Failed. No user found'));
        }
      })
      .then(user => {
        let tempNotification = new Notification();
        tempNotification.userId = req.body.friend;
        tempNotification.fromId = user._id;
        tempNotification.type = 'Friend Request';
        tempNotification.save();

      })
      .then(() => {
        res.sendStatus(204);

      })

      
      .catch(err => errorHandler(err, res));
        
  });

};