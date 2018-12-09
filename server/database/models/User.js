const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  firstname: String,
  owns: [String],
  reviews: [{
    id: String,
    author: {
      googleId: String,
      firstname: String,
      email: String,
      reported: {type: Boolean, default: false},
      profileImage: String
    },
    content: String,
    place: String, // Post the place ID
    images: [String], // Firebase logic client-side
    stars: Number
  }],
  favourites: [{placeId: String}],
  email: String,
  reported: {type: Boolean, default: false},
  profileImage: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;