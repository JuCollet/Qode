'use strict';

const express = require('express'),
      session = require('express-session'),
      path = require('path'),
      device = require('express-device'),
      bodyParser = require('body-parser'),
      qodeRouter = require('./routes/qodeRouter'),
      userRouter = require('./routes/userRouter'),
      logger = require('morgan'),
      aws = require('aws-sdk'),
      app = express();

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

require('./db'); // Singleton

app.use(logger("dev"));

app.use(session({
  secret: "Qode session",
  resave: true,
  saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Device detection - Desktop or mobile

app.use(device.capture());

app.get('/', function(req,res){
  if(req.device.type === 'phone'){
    res.sendFile(path.join(__dirname, '/../public/dist/mobile/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '/../public/dist/desktop/index.html'));
  }
});

app.use(express.static(path.join(__dirname, '/../public/dist/mobile')));
app.use(express.static(path.join(__dirname, '/../public/dist/desktop')));


app.use('/api/qodes', qodeRouter);
app.use('/user', userRouter);

// Issue with authenticating - Need to specify signature Version v4 for AWS4-HMAC-SHA256
// http://stackoverflow.com/questions/26533245/the-authorization-mechanism-you-have-provided-is-not-supported-please-use-aws4
app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3({
    endpoint: 's3-eu-central-1.amazonaws.com',
    signatureVersion: 'v4',
    region: 'eu-central-1'
  });
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
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
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
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

app.listen(process.env.PORT || 8080, function(){
  console.log('Server running');
});
