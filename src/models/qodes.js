'use strict';

const mongoose = require('mongoose');

const qodeSchema = new mongoose.Schema({
  qode : {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String
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
    color: {
      type: String,
      default: 'default'
    }
  }],
  files: [{
    fileName: String,
    filePath: String,
    fileType: String,
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