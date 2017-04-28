'use strict';

const mongoose = require('mongoose');

const recoverySchema = new mongoose.Schema({
  recoveryToken : String,
  createdAt: { 
    type: Date, 
    expires: '1h' 
  }
})

module.exports = mongoose.model('Recovery', recoverySchema);