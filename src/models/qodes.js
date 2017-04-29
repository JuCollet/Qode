'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const cardSchema = new mongoose.Schema({
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
});

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
  cards:[cardSchema],
  files: [{
    fileName: String,
    filePath: String,
    fileType: String,
  }],
  upVotes: {
    type: Number,
    default: 0
  },
  createdBy : {
      type: Schema.ObjectId,
      ref: 'User'
  },
  isFavorited : {
    type: Boolean,
    default: false
  },
  isLiked : {
    type: Boolean,
    default: false
  },
  isMine : {
    type: Boolean,
    default: false
  }
},
{
  timestamps:true
});

const model = mongoose.model('Qode', qodeSchema);

module.exports = model;