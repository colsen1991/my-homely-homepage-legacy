'use strict';

var models = require('./models');
var path = require('path');

var consumer = {
  doGetRoot: function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  },
  doGetComments: function (req, res) {
    models.Comment.find({}, {_id: 0}, function (err, comments) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      res.send(comments);
    });
  },
  doPostComments: function (req, res) {
    var newComment = new models.Comment(req.body);

    newComment.save(function (err, savedComment) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      res.send(savedComment);
    });
  }
};


module.exports = consumer;
