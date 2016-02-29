const wadsworth = require('../../logging/wadsworth');
const Blog = require('../../db/models/blog');

function getBlog(req, res) {
  Blog.findOne({ _id: req.params.blogId }, (error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}

function getExcerpts(req, res) {
  Blog.find({}, { _id: 1, title: 1, excerpt: 1 }, (error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}

exports.getBlog = getBlog;
exports.getExcerpts = getExcerpts;
