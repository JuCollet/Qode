'use strict';

const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser').json,
      qodeRouter = require('./routes/qodeRouter'),
      logger = require('morgan');

require('./db'); // Singleton

app.use(logger("dev"));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '/../public/dist')));

app.use('/api/qodes', qodeRouter);

// Catch 404 and forward to error handler;
app.use(function(req,res,next){
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Error handler : passing 'err' as first parameter 
// to let know Express that it's an error handler;
app.use(function(err,req,res,next){
  res.status(err.status || 500);
  res.json({
    error : {
      message : err.message
    }
  });
});

app.listen(process.env.PORT || 5000, function(){
  console.log('Server running');
});
