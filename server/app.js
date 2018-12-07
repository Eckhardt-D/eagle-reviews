const express     = require('express');
const cors        = require('cors');
const bodyParser  = require('body-parser');
const db          = require('./database');
const Review      = require('./database/models/Review');
const Place       = require('./database/models/Place');
const passport    = require('./authentication'); // Bring in Google auth strategy

const app = express(); // Init app

// Authentication init and middleware
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(cors());
app.use(bodyParser.json());

/**********
 * ROUTES *
 * ********/

app.get('/', /* passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),*/ (req, res) => {
  res.json({
    msg: 'Welcome!'
  });
});

/**
 * @description Gets the places with pagination queries
 */
app.get('/places', (req, res) => {
  let queryAmount;
  let startNumber;
  let amountOfDocs;

  // Count documents in collection
  Place.count({}, function (err, count) {
    if(!err) {
      amountOfDocs = count;
    }
  });

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
    data.push({
      remaining: remaining < 0 ? 0 : remaining
    });
    res.json(data);
  })
});

/**
 * @description Find a place by it's ID and send to client
 */
app.get('/places/:id', (req, res) => {
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
app.post('/places', (req, res) => {
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

app.get('/reviews', (req, res) => {
  Review.find({}, (err, data) => {
    res.json({...data, HELLO: 'TESTTT'});
  });
});

/**SERVER START */
app.listen(process.env.PORT || 5000, () => 
  process.env.PORT ? console.log('Listening on port '+ process.env.PORT) : console.log('Listening on http://localhost:5000'));