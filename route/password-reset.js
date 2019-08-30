'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const passwordToken = require('../model/passwordToken');
const uuidv4 = require('uuid/v4');
const User = require('../model/userModel');
const sendPasswordEmail = require('../lib/send-password-reset-email');
module.exports = router => {
  router.route('/createpasswordemail/') 
    .post(bodyParser, (req,res) => {
      // make sure that the email is a valid user
      User.find({email: req.body.email})
        .then(results => {
          console.log('results', results);
          if(results.length > 0){
            //check to see if we already have a reset token for email address
            passwordToken.find({email: req.body.email})
              .then(data => {
                // we already have one delete it
                if(data.length > 0) {
                  console.log('token found removing', data);
                  return data[0].remove();
                } else {
                  return ;
                }

              })
              .then(() => {
                // no current token create a new one
                let testToken = uuidv4();
    
                let newEntry = new passwordToken({
                  email: req.body.email,
                  token: testToken,
                });
                return newEntry.save();

              })
              .then(entry => {
                return sendPasswordEmail(entry.email, entry.token);
              })
              .then(data => {
                res.status(201).json(data);
              });
              

          } else {
            res.status(404).json('not found');
          }
        })
        
        .catch(err => errorHandler(err, res));

      

    });
  
};