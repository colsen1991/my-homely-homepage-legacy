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

function getBlogs(req, res) {
  Blog.find({ published: true }, { _id: 0, text: 0, published: 0 }, { sort: { created_at: -1 } }, (error, data) => {
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

function getBlogsForAdmin(req, res) {
  Blog.find({}, { _id: 1, title: 1, date: 1, published: 1 }, (error, data) => {
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
  Blog.findOne({ _id: req.params._id }, { _id: 0 }, (error, data) => {
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


function newBlog(req, res) {
  const newBlog = new Blog(req.body.blog);

  newBlog.save((error) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
}

function updateBlog(req, res) {
  Blog.update({ _id: req.params._id }, req.body.blog, (error, numAffected) => {
    if (error) {
      wadsworth.logError(error);
      res.sendStatus(500);
    } else if (numAffected.ok > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
}


exports.getBlogs = getBlogs;
exports.getBlog = getBlog;
exports.getBlogsForAdmin = getBlogsForAdmin;
exports.getBlogForEditing = getBlogForEditing;
exports.newBlog = newBlog;
exports.updateBlog = updateBlog;
