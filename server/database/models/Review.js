const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: {type: String, required: 'Required: author ID'},
  created: Date,
  content: {type: String, required: 'Required: content'},
  place: {type: String, required: 'Required: place ID'},
  images: [String],
  stars: {type: Number, required: 'Required: Stars'}
});

let Review = mongoose.model('Review', reviewSchema);

module.exports = Review;