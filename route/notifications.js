'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');


const User = require('../model/userModel');
const Notification = require('../model/notifications');
const bearerAuth = require('../lib/bearer-auth-middleware');



module.exports = router => {
  

  router.route('/notifications/')
    
    .get(bearerAuth, bodyParser, (req, res) => {
      return Notification.find({userId: req.user._id}).populate('fromId')
        .then(entrys => {
           
          res.status(200).json(entrys);
           
        })
        .catch(err => errorHandler(err, res));
    });

    
};     
  
   
