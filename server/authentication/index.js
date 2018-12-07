const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../database/models/User');

require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.C_KEY,
  clientSecret: process.env.C_SECRET,
  callbackURL: "http://localhost:5000"
},
(token, tokenSecret, profile, done) => {
  User.findOneAndUpdate({googleId: profile.id}, { 
    googleId: profile.id,
    firstname: profile.name.givenName,
    reported: false,
    profileImage: profile.photos[0].value
  }, {upsert: true}, (err, user) => done(err, user))
}
));

module.exports = passport;