'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      User = require('../models/users.js'),
      userRouter = express.Router();

userRouter.route('/')
  .get(function(req,res,next){
    User
      .findById(req.session.userId, '_id name favorites')
      .populate('favorites', '_id qode title subtitle description')
      .exec(function(err, user){
      if(err){
        const err = new Error('User not found');
        err.status = 404;
        next(err);
      } else {
        res.json(user);
      }
    })
  })
  .post(function(req, res, next){
    if(req.body.name &&
      req.body.mail &&
      req.body.password &&
      req.body.confirmPassword){
            
      let userData = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
      };
            
      User.create(userData, function(err,user){
        if(err){
          const err = new Error('Email already registered');
          err.status = 400;
          next(err);
        } else {
          req.session.userId = user._id;
          res.json({'name':user.name,'favorites':user.favorites});
        }

      })
      
    } else {
      const err = new Error('Some fields are missing');
      err.status = 400;
      return next(err);
    }
  })

userRouter.route('/addtofavorites')
  .post(function(req,res,next){
    User.findByIdAndUpdate({_id:req.session.userId, 'favorites':{$ne:req.body.favId}},{$addToSet:{favorites:req.body.favId}},{safe: true, upsert: true},function(err, user){
      if(err) return next(err);
      res.json({'status':'ok'});
    });
})


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
          req.session.userName = user.name;
          res.json({'name':user.name,'favorites':user.favorites});
        }
        
      })
    } else {
      const err = new Error('Missing mail or password !');
      next(err);
    }
  });

userRouter.route('/logout')
  .get(function(req,res,next){
    if(req.session){
      req.session.destroy(function(err){
        if(err) return next(err);
        else res.json({'isLogged':false})
      });
    } else {
      const err = new Error("Can't log out");
      next(err);
    }
  });

userRouter.route('/logcheck')
  .get(function(req,res){
    if(req.session.userId){
      return res.json({isLogged : {'log':true,'name':req.session.userName}});
    } else {
      return res.json({'log':false});
    }
  });

module.exports = userRouter;