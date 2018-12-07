const express = require('express');
const router  = express.Router();
const Place   = require('../database/models/Place');


/**
 * @description Gets the places with pagination queries
 */
router.get('/places', (req, res) => {
  let queryAmount;
  let startNumber;
  let amountOfDocs;

  // Count documents in collection
  Place.count({}, function (err, count) {
    if(!err) {
      amountOfDocs = count;
    }
  });

  // Handle query (pagination)
  if(req.query.limit) {
    queryAmount = parseInt(req.query.limit);
  } else {
    queryAmount = amountOfDocs;
  }

  if(req.query.start) {
    startNumber = parseInt(req.query.start);
  } else {
    startNumber = 1;
  }
  
  Place.find({}, null, {skip: startNumber - 1, limit: queryAmount}, (err, data) => {
    let remaining = amountOfDocs - ((startNumber - 1) + queryAmount)

    // Add remaining amount to response for client
    data.push({
      remaining: remaining < 0 ? 0 : remaining
    });
    res.json(data);
  })
});

/**
 * @description Find a place by it's ID and send to client
 */
router.get('/places/:id', (req, res) => {
  const placeId = req.params.id;

  Place.findById(placeId, (err, data) => {
    if(!err) {
      res.json(data)
    } else {
      res.send('No such document');
    }
  })
});

/**
 * @description POST a place and add to database (NEED AUTH)
 */
router.post('/places', (req, res) => {
  const place = req.body;

  const placeDetails = {
    name: place.name,
    category: place.category,
    averageStars: 0,
    owner: place.owner,
    created: place.date,
    description: place.description,
    images: place.images,
    address: place.address,
    contactDetails: {
      website: place.website,
      number: place.phone,
      email: place.email,
      emergency: place.emergency
    },
    reviews: [''],
    shares: 0,
    favourites: 0
    }

    Place.create(placeDetails, (err, place) => {
      if(err) return res.send(err);
      res.status(200).json(place);
    })
});

/**
 * @description Update a place by it's ID (AUTH)
 */
router.put('/places/:id', (req, res) => {
  let placeId = req.params.id;

  Place.findByIdAndUpdate(placeId, (err, data) => {
    if(!err) {
      res.json(data)
    } else {
      res.send('No such document');
    }
  })
});

/**
 * @description DELETE a place by it's ID (AUTH)
 */
router.delete('/places/id', (req, res) => {
  let placeId = req.params.id;

  Place.findByIdAndDelete(placeId, (err, data) => {
    if(!err) {
      res.json(data)
    } else {
      res.send('No such document');
    }
  })
});

module.exports = router;