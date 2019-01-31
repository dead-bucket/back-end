'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const User = require('../model/userModel');
const bearerAuth = require('../lib/bearer-auth-middleware');


module.exports = router => {
  
  router.put('/addfriend/', bearerAuth, bodyParser, (req, res) => {
    let user_id = req.user._id;
      
    User.findOne(req.user._id)
      .then(user => {
        if(user) {
          console.log('user before update',user);
          user.friends.push(req.body.friend);
          user.save();
          return user;
        } else {
          Promise.reject(new Error('Authorization Failed. No user found'));
        }
      })
      .then(() => {
        if(req.body.friend){
          User.findById(req.body.friend)
            .then(x => {
              console.log('frind found',x);
              let z = JSON.stringify(user_id);
              x.friends.push(JSON.parse(z));
              x.save();
              return;
            });
        } else {
          Promise.reject(new Error('Authorization Failed. No friend specified'));
        }
      })
      .then(() => {
        res.sendStatus(204);

      })

      
      .catch(err => errorHandler(err, res));
        
  });

};