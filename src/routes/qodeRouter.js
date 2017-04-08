'use strict';

const express = require('express'),
      mongoose = require('mongoose'),
      Qodes = require('../models/qodes'),
      qodeRouter = express.Router();

qodeRouter.route('/')
  .get(function(req,res){
    Qodes.find({}, function(err,qodes){
      if(err)throw err;
      res.json(qodes);
    })
  })
  .post(function(req,res){
    const newQode = req.body;
    Qodes.find({qode: req.body.qode}, function(err, qode){
      if(err) throw err;
      if(qode.length === 0){
        Qodes.create(newQode);
        res.json('Successfully Created');
      }
    })    
  })

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
    res.json({response : "You updated a qode"});
  })


module.exports = qodeRouter;