'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

const Entry = require('../model/entriesModel');
const bearerAuth = require('../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = router => {
  router.route('/entry/:id?')
    .post(bearerAuth, bodyParser, (req, res) => {
      console.log('in entries route post!!');
      req.body.userId = req.user._id;
      return new Entry(req.body).save()
        .then(createdEntry => res.status(201).json(createdEntry))
        .catch(err => errorHandler(err, res));
    })
  // this is working
    .get(bearerAuth, (req, res) => {
      console.log('in get route entries', req.query.id);
      if(req.query.id) {
        console.log('in find one GET route');
        return Entry.findById(req.query.id)
          .then(entry => res.status(200).json(entry))
          .catch(err => errorHandler(err, res));
      }

      return Entry.find()
        .then(entry => {
          console.log('in get all entries');
          let entryIds = entry.map(ent => ent._id);

          res.status(200).json(entryIds);
        })
        .catch(err => errorHandler(err, res));
    })
  //this is working 
    .put(bearerAuth, bodyParser, (req, res) => {

      Entry.findById(req.params.id)
        .then(entry => {
          if(!entry) return Promise.reject(new Error('Authorization error'));
          return entry.set(req.body).save();        
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })
  //  this is working
    .delete(bearerAuth, (req, res) => {
      return Entry.findById(req.params.id)
        .then(entry => {
          if(entry.userId.toString() === req.user._id.toString())
            return entry.remove();
          Promise.reject(new Error('objectid failed'));
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
  

};

