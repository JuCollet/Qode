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
  .put(function(req,res){
    res.json({response : "You updated a qode"});
  })
  .post(function(req,res){
    res.json({response : "You posted a qode"});      
  })

qodeRouter.route('/:id')
  .get(function(req,res){
    Qodes.find({ qode: req.params.id}, function(err,qodes){
      if(err)throw err;
      res.json(qodes);
    })  
})

module.exports = qodeRouter;