const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: String,
  content: String,
  place: String,
  images: [String],
  stars: Number
});

let Review = mongoose.model('Review', reviewSchema);

module.exports = Review;