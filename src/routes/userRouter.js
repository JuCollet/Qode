'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      User = require('../models/users.js'),
      userRouter = express.Router();

userRouter.route('/register')
  .post(function(req, res, next){
    if(req.body.name &&
      req.body.mail &&
      req.body.password &&
      req.body.confirmPassword){
      
      let userData = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password
      };
      
      User.create(userData, function(err,user){
        if(err)throw err;
        req.session.userId = user._id;
        res.send("new user named " + user.name +" created !")
      })
      
    } else {
      const err = new Error('Some fields are missing');
      err.status = 400;
      return next(err);
    }
  });

userRouter.route('/login')
  .post(function(req,res,next){
    if(req.body.mail && req.body.password){
      User.authenticate(req.body.mail, req.body.password, function(err, user){
        if(err || !user){
          const err = new Error('Wrong email or password');
          err.status = 401;
          next(err);
        } else {
          req.session.userId = user._id;
          res.send('Ok, you are logged in');
        }
        
      })
    } else {
      const err = new Error('Missing mail or password !');
      err.status = 401;
      next(err);
    }
  });

module.exports = userRouter;