'use string';

var models = require('./models');
var path = require('path');

function doGetRoot(req, res) {
  res.sendFile(path.resolve(__dirname + '/../index.html'));
}

function doGetComments(req, res) {
  models.CommentModel.find({}, {_id: 0}, function (err, comments) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.send(comments);
  });
}

function doPostComments(req, res) {
  var newComment = new models.CommentModel(req.body);

  newComment.save(function (err, savedComment) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.send(savedComment);
  });
}


exports.doGetRoot = doGetRoot;
exports.doGetComments = doGetComments;
exports.doPostComments = doPostComments;
