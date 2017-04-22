'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${cfg.user || process.env.mongo_user}:${cfg.pass || process.env.mongo_pass}@ds111461.mlab.com:11461/qode`, function(err){
  if(err) {
    console.log('Unable to connect to MongoDB');
  } else {
    console.log('Successfully connected to MongoDB !')
  }
});