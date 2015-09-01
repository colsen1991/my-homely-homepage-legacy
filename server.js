'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Comment;

var app = express();
app.use('/build', express.static('build'));
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/comments', function (req, res) {
  Comment.find({}, {_id: 0}, function (err, comments) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.send(comments);
  });
});

app.post('/comments', function (req, res) {
  var newComment = new Comment(req.body);

  newComment.save(function(err, savedComment) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.send(savedComment);
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('node server listening at http://%s:%s', host, port);

  mongoose.connect('mongodb://localhost:27017/testing');
  var dbConn = mongoose.connection;

  var CommentSchema = mongoose.Schema({
    author: String,
    text: String
  });

  Comment = mongoose.model('comment', CommentSchema);

  dbConn.on('error', console.error.bind(console, 'mongoose error'));
  dbConn.on('disconnected', console.log.bind(console, 'mongoose disconnected'));
  dbConn.on('connected', console.log.bind(console, 'mongoose connected'));
});
