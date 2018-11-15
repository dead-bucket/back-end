
'use strict';

const mongoose = require('mongoose');

const File = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userModel'},
  name : {type: String, required: true },
  description: {type: String, required: false },
  executeType: {type: String, required: true },
  executeDate: Date,
  cycle: { type: Number, required: true },
  email: { type: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userModel'}], required: false},
  s3Location: { type: String, required: false},
  canView: { type: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userModel'}], required: false},

}, {timestamps: true});

File.methods.createExecuteDate = function () {
  return new Promise((resolve, reject) => { 
    if(!this.cycle) return reject(new Error('Authorization failed in fileModel.js no cycle provided'));
    let milliseconds = Date.now();
    milliseconds =  milliseconds + (this.cycle*24*60*60*1000);
    this.excecuteDate = new Date(milliseconds);
    resolve(this);
  });
};

File.methods.updateExecuteDate = function(lastLogin) {
  return new Promise((resolve, reject) => {
    if(!lastLogin) return reject (new Error('Authorization falied in fileModel.js no last login provided'));
    let milliseconds = new Date(lastLogin);
    milliseconds =  milliseconds + (this.cycle*24*60*60*1000);
    this.executeDate = new Date(milliseconds);
    resolve(this);
  });
};
module.exports = mongoose.model('files', File);