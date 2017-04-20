'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      Qodes = require('../models/qodes'),
      User = require('../models/users'),
      qodeRouter = express.Router();

qodeRouter.route('/')
  .post(function(req,res,next){
    const newQode = req.body;
    Qodes.find({qode: req.body.qode}, function(err, qode){
      if(err) return next(err);
      if(qode.length === 0){
        Qodes.create(newQode);
        res.json('Successfully Created');
      }
    })    
  });

qodeRouter.route('/:id')
  .get(function(req,res,next){
    Qodes.find({qode: req.params.id}, function(err,qode){
      if(err) return next(err);
      if(qode.length === 1) {
        return qode;
      }
    }).then(function(qode){
      if(qode.length>0){
        User.findById(req.session.userId, function(err, user){
          if(err) return next(err);
          if(user){
            if(user.favorites.indexOf(qode[0]._id) !== -1){
              qode[0].isFavorited = true;
            } else {
              qode[0].isFavorited = false;
            }
            if(user.likes.indexOf(qode[0]._id) !== -1){
              qode[0].isLiked = true;
            } else {
              qode[0].isLiked = false;
            }
          }
          res.json(qode[0]);
        });
      } else {
        const err = new Error("Qode doesn't exist");
        err.status = 404;
        next(err);
      }
    });
  })
  .put(function(req,res,next){
    Qodes.findOneAndUpdate({qode:req.params.id},req.body, function(err,doc){
      if(err) return next(err);
      res.json({response : "Your qode is saved !"});
    })
  });

qodeRouter.route('/upvote/')
  .post(function(req,res,next){
    Qodes.findByIdAndUpdate(req.body.toUpvote, {$inc:{upVotes:1}}, function(err,doc){
      if(err) return next(err);
      return doc
    });
    User.findByIdAndUpdate({_id:req.session.userId, 'likes':{$ne:req.body.toUpvote}},{$addToSet:{likes:req.body.toUpvote}},{safe: true, upsert: true},function(err, user){
      if(err) return next(err);
      res.json({'status':'ok'});
    });
  })

qodeRouter.route('/check/')
  .post(function(req,res,next){
    const checkQode = req.body.qode;
    Qodes.find({qode:checkQode}, function(err,result){
      if(err) return next(err);
      if(result.length === 0){
        res.json({isAvailable:true});
      } else {
        res.json({isAvailable:false});
      }
    });
  });

module.exports = qodeRouter;