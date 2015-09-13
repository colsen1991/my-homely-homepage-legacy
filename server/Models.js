'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: String,
  text: String
});

var CommentModel = mongoose.model('comment', CommentSchema);

exports.CommentModel = CommentModel;
