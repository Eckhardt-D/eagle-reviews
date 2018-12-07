const router = require('express').Router();
const Review = require('../database/models/Review');
const Place  = require('../database/models/Place');
const User   = require('../database/models/User');

/**
 * @description GET a specific review
 */
router.get('/reviews/:id', (req, res) => {
  const reviewId = req.params.id;

  Review.findById(reviewId, (err, data) => {
    if(err) return res.send(err);
    res.json(data);
  })
});

/**
 * @description Create a review and update place and user with review
 */
router.post('/reviews', (req, res) => {
  const review = req.body;

  if(review.images.length < 0) {
    review.images = [''];
  }

  // Save review in database
  Review.create({
    author: review.author, // Use auth id/token
    content: review.content,
    place: review.place, // Post the place ID
    images: review.images, // Firebase logic client-side
    stars: review.stars
  }, function(err, data) {
    if(!err)
    review.id = data._id;
    let userReviews;
    let currentReviews;

    // Save full user object in review CALLBACK HELL, must refactor
    User.find({googleId: review.author}, (err, data) => {
      review.author = data[0];

      // Update the place and user with the reviews
      User.find({googleId: review.author.googleId}, (err, data) => {
        // if(err) console.log(err)
        userReviews = data[0].reviews;
        userReviews.push(review);
        
        // Update the place
        Place.findById(review.place, (err, data) => {
          currentReviews = data.reviews;
          currentReviews.push(review);

          // Update the database with user and place reviews
          Place.findByIdAndUpdate(review.place, {reviews: currentReviews}, (err, data) => {
            if(!err)
              return User.findByIdAndUpdate(review.author, {reviews: userReviews}, (err, data) => {
                if(!err) return res.status(200).send('OK');
                return res.status(500).send(err);
              });
            return res.status(500).send(err);
          });
        });
      });
    }); 
  });
});

/**
 * @description Increment the place's favourite, add to user's favourites
 */
router.post('/reviews/favourite', (req, res) => {
  const favouriteData = {
    place: req.body.place,
    author: req.body.author
  }

  // This is async, may potentially need to be refactored
  Place.findById(favouriteData.place, (err, data) => {
    let placeCurrentFavourites = data.favourites;
    console.log(placeCurrentFavourites)

    User.findOne({googleId: favouriteData.author}, (err, data) => {
      let userCurrentFavourites = data.favourites
      userCurrentFavourites.push({placeId: favouriteData.place});

      // Do the update logic callback hell style
      Place.findByIdAndUpdate(favouriteData.place, {favourites: placeCurrentFavourites + 1}, {upsert: true}, (err, data) => {
        console.log(data.favourites)
        if(!err) {
          User.findOneAndUpdate({googleId: favouriteData.author}, {upsert: true}, {favourites: userCurrentFavourites}, (err, data) => {
            if(!err) return res.status(200).send('OK');
            return res.status(500).send(err);
          });
        } else {
          return res.status(500).send(err)
        }
      });
    });
  }); // REFACTOR YOUR SHIT
});

/**
 * @description Trigger and save the share amount at place and user
 */
router.post('/reviews/share', (req, res) => {
  const shareData = {
    place: req.body.placeId,
    author: req.body.googleId
  }

  // This is async, may potentially need to be refactored
  let placeCurrentShares = Place.findById(shareData.place, (err, data) => data.shares);

  // Do the update logic callback hell style
  Place.findByIdAndUpdate(shareData.place, {favourites: placeCurrentShares + 1}, (err, data) => {
    if(!err) return res.status(200).send('OK');
    return res.status(500).send(err);
  });
});

/**
 * @description Update a review (AUTH)
 */
router.put('/reviews/:id', (req, res) => {
  const reviewId = req.params.id;
  const review = req.body.review;
  
  if(review.images.length < 0) {
    review.images = [''];
  }

  Review.findByIdAndUpdate(reviewId, review, (err, data) => {
    if(err) return res.send(err);
    res.json(data);
  });

  let currentReviews = User.find({googleId: review.author}, (err, data) => data.reviews);
  let newReviews = currentReviews.filter(item => item.place !== review.place).push(review);

  User.findOneAndUpdate({googleId: review.author}, {reviews: newReviews}, (err, data) => {
    if(!err) return res.status(200).send(data);
    return res.status(500).send(err);
  });

  Place.findOneAndUpdate({reviews: {}})
})

/**
 * @description Delete the favourite
 */
router.delete('/reviews/favourite', (req, res) => {
  const favouriteData = {
    place: req.body.placeId,
    author: req.body.googleId
  }

  // This is async, may potentially need to be refactored
  let placeCurrentFavourites = Place.findById(favouriteData.place, (err, data) => data.favourites);
  let userCurrentFavourites = User.findById(favouriteData.author, (err, data) => data.favourites);

  userCurrentFavourites.filter(item => item.placeId !== favouriteData.place);

  // Do the update logic callback hell style
  Place.findByIdAndUpdate(favouriteData.place, {favourites: placeCurrentFavourites - 1}, (err, data) => {
    if(!err) {
      User.findOneAndUpdate({googleId: favouriteData.author}, {favourites: userCurrentFavourites}, (err, data) => {
        if(!err) return res.status(200).send('OK');
        return res.status(500).send(err);
      });
    } else {
      return res.status(500).send(err)
    }
  });
})

module.exports = router;