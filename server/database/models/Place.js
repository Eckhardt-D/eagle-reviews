const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: String,
  category: [String],
  averageStars: Number,
  owner: {
    id: String,
    username: String,
    email: String,
    reported: {type: Boolean, default: false}
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
  reviews: [{
    author: {
      id: String,
      username: String,
      email: String,
      reported: {type: Boolean, default: false}
    },
    content: String,
    images: [String],
    stars: Number
  }],
  shares: Number,
  favourites: Number
});

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;