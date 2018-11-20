'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

const Entry = require('../model/entriesModel');
const Target = require('../model/targetModel');
const bearerAuth = require('../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = router => {
  router.route('/target/:id?')
    .post(bearerAuth, bodyParser, (req, res) => {
      console.log('in target route post!!');
      req.body.userId = req.user._id;
      return new Target(req.body).save()
        .then(createdEntry => res.status(201).json(createdEntry))
        .catch(err => errorHandler(err, res));
    })
  // this is working
    .get(bearerAuth, (req, res) => {
      console.log('in get route entries req.params.id', req.query.id);
      if(req.query.id) {
        console.log('in find one GET route', req.query.id);
        return Target.findById(req.query.id)
          .then(entry => res.status(200).json(entry))
          .catch(err => errorHandler(err, res));
      }

      return Target.find({userId: req.user._id})
        .then(entries => {
          console.log('in get all entries');
          // let entryIds = entry.map(ent => ent._id);

          res.status(200).json(entries);
        })
        .catch(err => errorHandler(err, res));
    })
  //this is working 
  //   .put(bearerAuth, bodyParser, (req, res) => {

  //     Entry.findById(req.params.id)
  //       .then(entry => {
  //         if(!entry) return Promise.reject(new Error('Authorization error'));
  //         return entry.set(req.body).save();        
  //       })
  //       .then(() => res.sendStatus(204))
  //       .catch(err => errorHandler(err, res));
  //   })
  // //  this is working
    .delete(bearerAuth, (req, res) => {
      return Target.findById(req.query.id)
        .then(targetEntry => {
          console.log('deleted target entry', targetEntry)
          if(targetEntry)
            return targetEntry.remove();
          Promise.reject(new Error('objectid failed'));
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};