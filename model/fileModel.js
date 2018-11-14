
'use strict';

const mongoose = require('mongoose');

const File = mongoose.Schema({
  name : {type: String, required: true },
  dosage : {type: Number, required: true },
}, {timestamps: true});

module.exports = mongoose.model('files', File);