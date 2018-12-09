const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {type: String, required: 'Required: name'},
  category: [{type: String, required: 'Required: category'}],
  averageStars: Number,
  owner: {
    googleId: {type: String, required: 'Required: user'},
    firstname: {type: String, required: 'Required: user'},
    email: {type: String, required: 'Required: user'},
    reported: {type: Boolean, default: false},
    profileImage: {type: String, required: 'Required: image'}
  },
  created: Date,
  description: {type: String, required: 'Required: description'},
  images: [String],
  address: {type: String, required: 'Required: contact details'},
  contactDetails: {
    website: {type: String, required: 'Required: contact details'},
    number: {type: String, required: 'Required: contact details'},
    email: {type: String, required: 'Required: contact details'},
    emergency: {type: String, required: 'Required: contact details'}
  },
  reviews: [Object],
  shares: Number,
  favourites: Number
});

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;