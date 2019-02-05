'use strict';

const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const Entries = require('../model/entriesModel');

const bearerAuth = require('../lib/bearer-auth-middleware');
const Target = require('../model/targetModel');
const User = require('../model/userModel');

module.exports = router => {
  
  // const importance = async function(userObject) {
  //   let count = await Entries.countDocuments({recipient: userObject._id});
  //   return count;
  // }
  function countPromise(userObject) {
    
    return new Promise(resolve => {
      Entries.countDocuments({recipient: userObject._id})
        .then(count => {
          // console.log('_______________________')
          let newObject = {
            _id: userObject._id,
            picture: userObject.picture,
            username:userObject.username,
            email: userObject.email,
            firstname: userObject.firstname ? userObject.firstname : '',
            lastname: userObject.lastname ? userObject.lastname : '',
            count: count,
          }
          
          return newObject;
          
        })
        .then(object => {
          // console.log('2nd _______________________', object);
          resolve (object);

        })
    });
  }

  async function processArray(array, sortby) {
    let tempArray = array;
    let returnArray = [];
    for (let i = 0; i < tempArray.length; i++) {
      // console.log('type of item', typeof(array[i]));
      // array[i].text = 'hello';
      let temp = await countPromise(tempArray[i])
     
        
        returnArray.push(temp);
     
    }
    // points.sort(function(a, b){return a-b});
    if(sortby === 'alpha') {
      console.log('in alpha sort');
      returnArray.sort(function(a, b){
        if(a.lastname.toLowerCase() < b.lastname.toLowerCase()) { return -1; }
        if(a.lastname.toLowerCase() > b.lastname.toLowerCase()) { return 1; }
        return 0;
    })
    } else {
      console.log('in count sort')
      returnArray.sort(function(a,b) {return (b.count - a.count)});
    }
    return returnArray;
  }


  router.get('/dashboard/', bodyParser, bearerAuth, (req, res) => {
    let dashboardObject,returnObject = [];
    console.log('req.user', req.user);
    return Target.find({userId: req.user._id})
      .then(entries => {
        dashboardObject = entries;
      })
      .then(() => {
        return User.find({friends: { '$in' : [`${req.user._id}`]}});
      })
      .then(userEntries => {
        returnObject = dashboardObject.concat(userEntries);
        return returnObject;
      })
      .then(array => {
        let testArray = processArray(array, req.user.sortby);
        
        return testArray;
      })
      // .then(array => {
      //   console.log('after count function  ', array);
      //   return array;
      // })
      .then(testArray => {
        
        res.status(200).json(testArray);
      })
      .catch(err => errorHandler(err, res));
  });
};