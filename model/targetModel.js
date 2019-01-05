const mongoose = require('mongoose');

const targetModel = mongoose.Schema({
  name : { type: String, required: true},
  email : { type: String, required: false},
  picture : { type: String, required: false, default:'https://img.icons8.com/android/100/000000/user.png'},
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userModel'},
  entries : [{type: mongoose.Schema.Types.ObjectId,  ref: 'entries'}],
  photo : {type: String, required: false},
  
  
}, {timestamps: true});

module.exports = mongoose.model('targetModel', targetModel);