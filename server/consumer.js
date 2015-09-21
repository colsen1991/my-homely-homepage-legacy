'use strict';

var models = require('./models');
var CommentModel = models.CommentModel;

function doGetComments(req, res) {
  CommentModel.find({}, {_id: 0}, function (err, comments) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.send(comments);
  });
}

function doPostComments(req, res) {
  var newComment = new CommentModel(req.body);

  newComment.save(function (err, savedComment) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.send(savedComment);
  });
}


exports.doGetComments = doGetComments;
exports.doPostComments = doPostComments;
