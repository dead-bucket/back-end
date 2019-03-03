'use strict';

const User = require('../model/userModel');


async function updateUser(userid, newuser) {
  // console.log('in update user ======', userid, newuser);
  let tempExistingUser = await User.findById(userid);
  tempExistingUser.notifications.push(newuser);
  let tempPending = 
  tempExistingUser.pendingRequest.filter(el => {
    return el !== newuser.email;
  });
  tempExistingUser.pendingRequest = tempPending;
  // console.log('tempuser before save', tempExistingUser);
  tempExistingUser.save();


}
module.exports = function (searchId, newUser) {
  return new Promise(resolve => {
    // console.log('in find-user');
    return User.find({pendingRequest: {$in: `${searchId}`}})
      .then(data => {
        if(data.length > 0) {
          console.log('data', data);
          data.forEach(element => {
            updateUser(element._id, newUser);           
          });
          
          resolve(data);
        } else {
          console.log('in else');
          resolve('no user');
        }
      })
      .catch(err => console.error(err));

  });
};