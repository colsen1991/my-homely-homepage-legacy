const mongoose = require('mongoose');

module.exports = mongoose.model('Blog', new mongoose.Schema({
  id: String,
  headerImageLink: String,
  title: String,
  date: String,
  excerpt: String,
  text: String,
  published: Boolean
}));
