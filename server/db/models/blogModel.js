const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogModel = mongoose.model('Blog', new Schema({
  title: String,
  excerpt: String,
  text: String
}));

module.exports = BlogModel;
