const mongoose = require('mongoose');

const BlogModel = mongoose.model('Blog', new mongoose.Schema({
  title: String,
  excerpt: String,
  text: String
}));

module.exports = BlogModel;
