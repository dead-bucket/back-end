
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

module.exports = mongoose.model('files', File);