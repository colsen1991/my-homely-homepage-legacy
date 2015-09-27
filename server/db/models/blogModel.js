'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title: String,
  excerpt: String,
  text: String
});

var BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;
