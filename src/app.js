'use strict';

const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser').json,
      connect = require('./db'),
      qodeRouter = require('./routes/qodeRouter');

const app = express(),
      router = express.Router();

app.use(bodyParser());
app.use(express.static(path.join(__dirname, '/../public/dist')));

app.use('/qodes', qodeRouter);

app.listen(8080, function(){
  console.log('Server running');
});
