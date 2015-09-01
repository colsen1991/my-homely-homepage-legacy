'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  author: String,
  text: String
});

var Models = {
  Comment: mongoose.model('comment', CommentSchema)
};

module.exports = Models;
