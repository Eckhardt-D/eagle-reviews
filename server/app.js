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

app.get('/', /* passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),*/ (req, res) => {
  res.json({
    msg: 'Welcome!'
  })
});

/**ROUTES */
app.get('/reviews', (req, res) => {
  Review.find({}, (err, data) => {
    res.json(data);
  });
});

app.get('/places', (req, res) => {
  Place.find({}, (err, data) => {
    res.json(data);
  })
})

/**SERVER START */
app.listen(process.env.PORT || 5000, () => 
  process.env.PORT ? console.log('Listening on port '+ process.env.PORT) : console.log('Listening on http://localhost:5000'));