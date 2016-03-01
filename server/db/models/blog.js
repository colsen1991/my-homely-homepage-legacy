const mongoose = require('mongoose');

module.exports = mongoose.model('Blog', new mongoose.Schema({
  id: String,
  title: String,
  excerpt: String,
  text: String
}));
