const router       = require('express').Router();
const DbController = require('../controllers/dbController');
const Review       = require('../database/models/Review');
const Place        = require('../database/models/Place');
const User         = require('../database/models/User');

const db = new DbController();

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
    review.id = data._id;

    db.updateUserAndPlaceReviews(review)
    .then(result => {
      if(result === 200) {
        res.status(200).send('OK');
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
  });
});

/**
 * @description Increment the place's favourite, add to user's favourites
 */
router.post('/reviews/favourite', (req, res) => {
  db.updateUserAndPlaceFavourite(req.body.place, req.body.author)
  .then(() => res.status(200).send('OK'))
  .catch(() => res.status(500).send('INTERNAL ERR'));
});

/**
 * @description Trigger and save the share amount at place and user
 */
router.post('/reviews/share', (req, res) => {
  db.updatePlaceShares(req.body.place, req.body.author)
  .then(yes => res.status(200).send('OK'))
  .catch(() => res.status(500).send('INTERNAL ERR'))
});

/**
 * @description Update a review (AUTH)
 */
router.put('/reviews/:id', (req, res) => {
  db.editPlaceReview(req.body, req.params.id)
  .then(() => res.status(200).send('OK'))
  .catch(() => res.status(500).send('INTERNAL ERR'));
})


module.exports = router;