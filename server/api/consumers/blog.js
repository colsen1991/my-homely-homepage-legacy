const wadsworth = require('../../logging/wadsworth');
const Blog = require('../../db/models/blog');

function getBlog(req, res) {
  Blog.findOne({ id: req.params.id, published: true }, { _id: 0, published: 0 }, (error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else if (data) {
      res.send(data);
    } else {
      res.sendStatus(404);
    }
  });
}

function getExcerpts(req, res) {
  Blog.find({ published: true }, { _id: 0, text: 0, published: 0 }, (error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else if (data) {
      res.send(data);
    } else {
      res.sendStatus(204);
    }
  });
}

function getAllBlogs(req, res) {
  Blog.find({}, { _id: 0, id: 1, title: 1, date: 1, published: 1 }, (error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else if (data) {
      res.send(data);
    } else {
      res.sendStatus(204);
    }
  });
}

function getBlogForEditing(req, res) {
  Blog.findOne({ id: req.params.id }, { _id: 0 }, (error, data) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else if (data) {
      res.send(data);
    } else {
      res.sendStatus(404);
    }
  });
}

exports.getBlog = getBlog;
exports.getExcerpts = getExcerpts;
exports.getAllBlogs = getAllBlogs;
exports.getBlogForEditing = getBlogForEditing;
