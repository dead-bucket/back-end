'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');


const bearerAuth = require('../lib/bearer-auth-middleware');
const Target = require('../model/targetModel');
const User = require('../model/userModel');

module.exports = router => {
  router.get('/dashboard/', bodyParser, bearerAuth, (req, res) => {
    let dashboardObject = [];

    return Target.find({userId: req.user._id})
      .then(entries => {
        // console.log('target enytries', entries);
        dashboardObject = entries;
        return dashboardObject;
      })
      .then(object => {
        console.log('concatted object', object);
      })
      .then(() => {
        return User.find({friends: { "$in" : [`${req.user._id}`]}});
      })
      .then(userEntries => {
        let returnObject = dashboardObject.concat(userEntries);
        
        res.status(200).json(returnObject);
      })
      .catch(err => errorHandler(err, res));
  });
};