'use strict';

const User = require('../model/userModel');

module.exports = function (searchId) {
  return new Promise(resolve => {
    return User.find({email: `${searchId}`})
      .then(data => {
        if(data.length > 0) {
          resolve(data);
        } else {
          resolve('no user');
        }
      })
      .catch(err => console.error(err));

  });
};