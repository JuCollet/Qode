'use strict';

const mongoose = require('mongoose'),
      cfg = require('../config.js').mongodb;

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${cfg.user || process.env.mongo_user}:${cfg.pass || process.env.mongo_pass}@ds145780.mlab.com:45780/qode`, function(err){
  if(err) {
    console.log('Unable to connect to MongoDB');
  } else {
    console.log('Successfully connected to MongoDB !')
  }
});