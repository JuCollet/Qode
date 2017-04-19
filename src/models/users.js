'use strict';

const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
    trim: true
  },
  mail : {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password : {
    type: String,
    required: true,
  },
  favorites : [{
      type: Schema.ObjectId,
      ref: 'Qode'
    }]
  },
  {
    timestamps:true
});

//Authenticating the user
userSchema.statics.authenticate = function(mail, password, cb){
  User.findOne({mail:mail})
    .exec(function(err,user){
      if(err)throw err;
      if(!user){
        const err = new Error('User not found !');
        err.status = 404;
        return cb(err);
      }
    bcrypt.compare(password, user.password, function(err, result){
      if(err)throw err;
      if(result === true) {
        return cb(null,user);
      } else {
        return cb();
      }
    })
  })
};

//hash password before saving.
userSchema.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err)throw err;
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;