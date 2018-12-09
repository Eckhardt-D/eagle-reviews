const express      = require('express');
const DbController = require('../controllers/dbController');
const router       = express.Router();
const Place        = require('../database/models/Place');

const db = new DbController();


/**
 * @description Gets the places with pagination queries
 */
router.get('/places', (req, res) => {
  db.paginate(req)
  .then(data => res.json(data))
  .catch(err => res.status(500).send('INTERNALL ERR'));
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
  });
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
    owner: place.owner, // User auth token/id
    created: place.date, // Client side date
    description: place.description,
    images: place.images, // Firebase logic client-side
    address: place.address,
    contactDetails: {
      website: place.contactDetails.website,
      number: place.contactDetails.number,
      email: place.contactDetails.email,
      emergency: place.contactDetails.emergency
    },
    reviews: [{}],
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

  Place.findByIdAndUpdate(placeId, req.body, (err, data) => {
    if(!err) {
      res.status(200).send('OK');
    } else {
      res.send('No such document');
    }
  })
});

/**
 * @description DELETE a place by it's ID (AUTH)
 */
router.delete('/places/:id', (req, res) => {
  let placeId = req.params.id;

  Place.findByIdAndDelete(placeId, (err, data) => {
    if(!err) {
      res.status(200).send('OK');
    } else {
      res.send('No such document');
    }
  })
});

module.exports = router;