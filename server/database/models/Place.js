const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: String,
  category: [String],
  averageStars: Number,
  owner: {
    googleId: String,
    firstname: String,
    email: String,
    reported: {type: Boolean, default: false},
    profileImage: String
  },
  created: Date,
  description: String,
  images: [String],
  address: String,
  contactDetails: {
    website: String,
    number: String,
    email: String,
    emergency: String
  },
  reviews: [Object],
  shares: Number,
  favourites: Number
});

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;