'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

const Entry = require('../model/entriesModel');
const bearerAuth = require('../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = router => {

  router.route('/targetentry/')
    .get(bearerAuth, bodyParser, (req, res) => {
      console.log('target route get', req.body.recipient);
      if(req.body.recipient) {
        console.log('in find one GET route by recipient');
        return Entry.find({userId: req.user.id, recipient: req.body.recipient})
          .then(entry => res.status(200).json(entry))
          .catch(err => errorHandler(err, res));
      }
    });
};