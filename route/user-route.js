'use strict';

const User = require('../model/userModel');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const basicAuth = require('../lib/basic-auth-middleware');
const bearerAuth = require('../lib/bearer-auth-middleware');
const uploadPic = require('../file_upload');
const createNotifications = require('../lib/create-notifications');
const sendDocumentCount = require('../lib/send-email-generic');

module.exports = function(router) {
  router.post('/signup', bodyParser, (req, res) => {
    let pw = req.body.password;
    delete req.body.password;
    let profileImage = req.body.picture;
    req.body.picture = null;
    User.countDocuments({})
      .then(data => {
        if( data > 750) {
          let emailInfo = {
            email: 'roger.neil.davenport@gmail.com',
            text: `You have reached ${data} users `,
            subject: 'Thoughtline User Count',
            title: 'No Of Users ',
          };
          sendDocumentCount(emailInfo);

        } else {
          return;
        }

      });
    let user = new User(req.body);
    if(profileImage) {
      return uploadPic(profileImage, user._id)
        .then(data => {
          user.picture = data.data.Location;
          return user;
        })
        .then(() => {
          return user.generatePasswordHash(pw)
            .then(newUser => newUser.save())
            .then(userRes => req.user = userRes)
            .then(userRes => {
              createNotifications(userRes);
              return userRes;
            })
            .then(userRes => userRes.generateToken())
            .then(token => {
              let blob = {};
              blob.user = req.user;
              blob.token = token;
              res.status(201).json(blob);
          
            })
            .catch(err => errorHandler(err, res));
        
        })
        .catch(err => errorHandler(err, res));
    }

    if(!profileImage) {
      user.picture = 'https://png.pngtree.com/svg/20160319/49805b8c9c.svg';
      return user.generatePasswordHash(pw)
        .then(newUser => newUser.save())
        .then(userRes => req.user = userRes)
        .then(userRes => {
          createNotifications(userRes);
          return userRes;
        })
        .then(userRes => userRes.generateToken())
        .then(token => {
          let blob = {};
          blob.user = req.user;
          blob.token = token;
          res.status(201).json(blob);
    
        })
        .catch(err => errorHandler(err, res));
    } 
        
    

  });

  router.get('/signin', basicAuth, (req, res) => {
    
    User.findOne({ username: req.userModelHeader.username })
      .then(user => 
        user
          ? user.comparePasswordHash(req.userModelHeader.password)
          : Promise.reject(new Error('Authorization Failed. Username required.'))
      )
      .then(user => req.user = user)
      .then(user => user.updateLogin())
      .then(user => user.generateToken())
      .then(token => {
        let blob = {};
        blob.token = token;
        blob.user = req.user;
        res.status(200).json(blob);

      })
      .catch(err => errorHandler(err, res));
  });
  
  router.put('/changepassword', bearerAuth, bodyParser, (req, res) => {
      
    User.findOne(req.user._id)
      .then(user => {
        if(user) {
          return user.comparePasswordHash(req.body.oldpassword);
        } else {
          Promise.reject(new Error('Authorization Failed. No user found'));
        }
      })
      .then(userRes => {
        let pw = req.body.newpassword;
        delete req.body.newpassword;
        delete req.body.oldpassword;
        userRes.generatePasswordHash(pw)
          .then( updatedUser => {
            updatedUser.save();
          })
          .then(() => res.sendStatus(204))
          .catch(err => errorHandler(err, res));
      })
      .catch(err => errorHandler(err, res));
        
  });

  
    
  
};