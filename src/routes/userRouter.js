'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      User = require('../models/users'),
      Qode = require('../models/qodes'),
      mailer = require('../mailer'),
      userRouter = express.Router();

userRouter.route('/')
  .get(function(req,res,next){
    if(req.session.userId == null){
      const err = new Error('Not authenticated');
      err.status = 401;
      return next(err);
    }
    User
      .findById(req.session.userId, '_id name favorites myqodes')
      .populate('favorites', '_id qode title subtitle description')
      .populate('myqodes', '_id qode title subtitle description')
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
            mailer(req.body.name,req.body.mail);
            req.session.userId = user._id;
            res.json({'name':user.name,'favorites':user.favorites});
          }
        });
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
          err.status = 400;
          next(err);
        } else {
          req.session.userId = user._id;
          req.session.userName = user.name;
          res.json({'name':user.name,'favorites':user.favorites, 'myqodes':user.myqodes});
        }
      })
    } else {
      const err = new Error('Missing mail or password !');
      err.status = 400;
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
      const err = new Error("Not logged");
      err.status = 400;
      next(err);
    }
  });

userRouter.route('/islogged')
  .get(function(req,res){
    if(req.session.userId){
      return res.json({isLogged : {'log':true,'name':req.session.userName}});
    } else {
      return res.json({isLogged : {'log':false}});
    }
  });

userRouter.route('/addtofavorites')
  .put(function(req,res,next){
    User.findByIdAndUpdate({_id:req.session.userId, 'favorites':{$ne:req.body.favId}},{$addToSet:{favorites:req.body.favId}},{safe: true, upsert: true},function(err){
      if(err) return next(err);
      res.json({'status':'ok'});
    });
  });

userRouter.route('/removefromfavorites')
  .put(function(req,res,next){
    User.findByIdAndUpdate({_id:req.session.userId, 'favorites':{$eq:req.body.favId}},{$pull:{favorites:req.body.favId}},{safe: true, multi: false},function(err){
      if(err) return next(err);
      res.json({'status':'ok'});
    });
  });

userRouter.route('/deleteqode/:qodeId')
  .delete(function(req,res,next){
    Qode.findOneAndRemove({_id:req.params.qodeId, 'createdBy':{$eq:req.session.userId}},null,function(err,qode){
      if(err) return next(err);
      if(qode === undefined || qode === null){
        const err = new Error("Your're not authorized to delete this Qode");
        err.status = 401;
        return next(err);
      } else {
        User.findByIdAndUpdate({_id:req.session.userId, 'myqodes':{$eq:req.params.qodeId}},{$pull:{myqodes:req.params.qodeId}},{safe: true, multi: false},function(err){
          if(err) return next(err);
          res.json({'status':'ok'});
        });
      }
    })
  });

module.exports = userRouter;