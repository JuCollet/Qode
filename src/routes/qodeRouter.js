'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      Qodes = require('../models/qodes'),
      User = require('../models/users'),
      qodeRouter = express.Router();

qodeRouter.route('/')
  .post(function(req,res){
    const newQode = req.body;
    Qodes.find({qode: req.body.qode}, function(err, qode){
      if(err) throw err;
      if(qode.length === 0){
        Qodes.create(newQode);
        res.json('Successfully Created');
      }
    })    
  });

qodeRouter.route('/:id')
  .get(function(req,res,next){
    Qodes.find({qode: req.params.id}, function(err,qode){
      if(err)throw err;
      if(qode.length === 1) {
        res.json(qode);
      } else {
        const err = new Error("Qode doesn't exist");
        err.status = 404;
        next(err);
      }
    })
  })
  .put(function(req,res){
    Qodes.findOneAndUpdate({qode:req.params.id},req.body, function(err,doc){
      if(err) throw err;
      res.json({response : "Your qode is saved !"});
    })
  });

qodeRouter.route('/check/')
  .post(function(req,res){
    const checkQode = req.body.qode;
    Qodes.find({qode:checkQode}, function(err,result){
      if(err) throw err;
      if(result.length === 0){
        res.json({isAvailable:true});
      } else {
        res.json({isAvailable:false});
      }
    });
  });

module.exports = qodeRouter;