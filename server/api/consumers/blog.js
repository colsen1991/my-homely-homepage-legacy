const wadsworth = require('../../logging/wadsworth');
const Blog = require('../../db/models/blog');

function getBlog(req, res) {
  Blog.findOne({ id: req.params.id }, (error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}

function getExcerpts(req, res) {
  Blog.find({}, { id: 1, title: 1, excerpt: 1 }, (error, data) => {
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
