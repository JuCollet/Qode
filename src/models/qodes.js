'use strict';

const mongoose = require('mongoose');

const qodeSchema = new mongoose.Schema({
  qode : {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required : true
  },
  subtitle: String,
  description: String,
  cards : [{
    cardTitle: String,
    cardText: String,
    cardReferences: [{
      text: String,
      link: String
    }],
    files: [{
      fileText: String,
      filePath: String,
      fileType: String,
    }],
    color: {
      type: String,
      default: 'default'
    }
  }],
  upVotes: {
    type: Number,
    default: 0
  }
},
{
  timestamps:true
})

const model = mongoose.model('Qode', qodeSchema);

module.exports = model;