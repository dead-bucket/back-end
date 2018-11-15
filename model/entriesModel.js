'use strict';

const mongoose = require('mongoose');

const Entry = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userModel'},
  recipient: [String],
  mood: {type: String, required: false},
  description: {type: String, required: false },
 }, {timestamps: true});

F
};
module.exports = mongoose.model('entries', Entry);