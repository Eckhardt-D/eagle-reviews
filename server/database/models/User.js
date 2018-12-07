const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  firstname: String,
  email: String,
  reported: {type: Boolean, default: false},
  profileImage: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;