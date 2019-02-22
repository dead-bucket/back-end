'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Entry = require('../model/entriesModel');
const bearerAuth = require('../lib/bearer-auth-middleware');
const User = require('../model/userModel');

module.exports = router => {
  router.route('/inbox/:sender?')
    .get(bearerAuth, bodyParser, (req, res) => {
    // This will return an array with all the entries that have been
    // sent to user from the target.
    // console.log('Sender params: ', req.params.sender);
      if (req.query.sender) {
        return Entry.find({
          userId: req.query.sender,
          recipient: req.user.id,
          delivered: true,
        })
        // .then(results => {
          
        //   if(req.user.newmessages.includes(req.params.sender)) {
        //     User.findOne({_id: req.user.id})
        //       .then(user => {
        //         let temp = user.newmessages.filter(el => el !== req.params.sender);
        //         user.newmessages = temp;
        //         user.save();
        //       });
        //   }
        //   return results;
        //   // res.status(200).json(results);
        // })
          .then(results => res.status(200).json(results))
          .catch(err => errorHandler(err, res));
      }
      if (!req.query.sender) {
        return errorHandler(
          new Error('objectid failed, no recipient specified'),
          res
        );
      }
    });
};
