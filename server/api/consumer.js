'use strict';

var models = require('./../db/models');
var BlogModel = models.BlogModel;

function doGetBlogIdList(req, res) {
  findInBlogs({}, {_id: 1}, {}, req, res);
}

function doGetBlog(req, res) {
  findOneInBlogs({_id: req.params.blogId}, {}, {}, req, res);
}

function doGetBlogExcerpt(req, res) {
  findOneInBlogs({_id: req.params.blogId}, {_id: 1, title: 1, excerpt: 1}, {}, req, res);
}

function findInBlogs(query, fields, options, req, res) {
  BlogModel.find(query, fields, options, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500);
      return;
    }

    res.send(data);
  });
}

function findOneInBlogs(query, fields, options, req, res) {
  BlogModel.findOne(query, fields, options, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500);
      return;
    }

    res.send(data);
  });
}

exports.doGetBlogIdList = doGetBlogIdList;
exports.doGetBlog = doGetBlog;
exports.doGetBlogExcerpt = doGetBlogExcerpt;
