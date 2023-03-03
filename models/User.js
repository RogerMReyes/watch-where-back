'use strict'

const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
  email: String,
  name: String,
  
});

module.exports = mongoose.model('User', UserSchema);