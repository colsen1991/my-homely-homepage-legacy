const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = mongoose.model('User',  new Schema({
  username: String,
  password: String
}));

module.exports = UserModel;
