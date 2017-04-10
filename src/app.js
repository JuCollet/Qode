'use strict';

const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser').json,
      qodeRouter = require('./routes/qodeRouter'),
      logger = require('morgan'),
      aws = require('aws-sdk');

require('./db'); // Singleton

app.use(logger("dev"));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '/../public/dist')));

app.use('/api/qodes', qodeRouter);

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: 'qodefiles',
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://qodefiles.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

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
