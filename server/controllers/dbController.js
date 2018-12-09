const Review = require('../database/models/Review');
const Place  = require('../database/models/Place');
const User   = require('../database/models/User');

/**
 * Class that helps clean up Database actions in routes
 */
class DbController {
  /**
   * 
   * @param {Object} req - The request object
   * @returns {Object} - The Places requested 
   */
  paginate(req) {
    return new Promise((resolve, reject) => {
      let queryAmount;
      let startNumber;
      let amountOfDocs;

      // Count documents in collection
      Place.count({})
      .then(count => {
        amountOfDocs = count;

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
          if(err) return reject('No docs');
          let remaining = amountOfDocs - ((startNumber - 1) + queryAmount);
  
          // Add remaining amount to response for client
          data.push({
            remaining: remaining < 0 ? 0 : remaining
          });
          return resolve(data);
        });
      })
      .catch(e => reject(e))
    });
  }
  /**
   * Update the user and place with the new review
   * @return {Promise} To abstract the logic for updating
   */
  updateUserAndPlaceReviews(review) {
    return new Promise((resolve, reject) => {
      // Find the user and place
      Promise.all([
        User.find({googleId: review.author}),
        Place.findById(review.place)
      ])
      .then(([userObject, placeObject]) => {
        review.author = userObject[0];
        let userReviews   = userObject[0].reviews;
        let currentReviews = placeObject.reviews;

        function cutOut(arrayItem) {
          arrayItem.forEach((item,index) => {
            if(item && review && item.id && review.id) {
              if(item.id.toString() === review.id.toString()) {
                userReviews.splice(index, 1);
              }
            }
          });
        }

        try {
          cutOut(userReviews);
          cutOut(currentReviews);
        } catch(err) {
          console.log(err);
        }

        // Edit the review
        userReviews.push(review);        
        currentReviews.push(review);

        // Update the database
        Promise.all([
          Place.findByIdAndUpdate(review.place, {reviews: currentReviews}),
          User.findByIdAndUpdate(review.author, {reviews: userReviews})
        ])
        .then(([success1, success2]) => {
          return resolve(200);
        })
        .catch(err => reject(err));
      })
      .catch(err => reject(err));
    });
  }

  /**
   * @return {Promise} - Creates a favourite in the user and place collection document
   */
  updateUserAndPlaceFavourite(place, author) {
    return new Promise((resolve, reject) => {
      const favouriteData = {place, author}

      Promise.all([
        Place.findById(favouriteData.place),
        User.findOne({googleId: favouriteData.author})
      ])
      .then(([placeData, userData]) => {
        let placeCurrentFavourites = placeData.favourites;
        let userCurrentFavourites = userData.favourites;
        let alreadyFaved = false;

        // Check if the item exists
        userData.favourites.forEach(fav => {
          if(fav.placeId === favouriteData.place) {
            alreadyFaved = true
          }
        })

        // Unfavourite if exists
        if(alreadyFaved === true) {
          this.deleteFavourite(favouriteData.place, favouriteData.author)
          .then(res => resolve(200))
          .catch(err => reject(err));
        } else {
          // Create the favourite
          userCurrentFavourites.push({placeId: favouriteData.place});

          Promise.all([
            Place.findByIdAndUpdate(favouriteData.place, {favourites: placeCurrentFavourites + 1}, {upsert: true}),
            User.findOneAndUpdate({googleId: favouriteData.author}, {favourites: userCurrentFavourites}, {upsert: true})
          ])
          .then(success => resolve(200))
          .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
    });
  }

  updatePlaceShares(place, author) {
    return new Promise((resolve, reject) => {
      const shareData = { place, author };
    
      Promise.resolve(Place.findById(shareData.place))
      then(result => {
        let placeCurrentShares = result.shares;

        // Do the update logic callback hell style
        Place.findByIdAndUpdate(shareData.place, {favourites: placeCurrentShares + 1}, (err, data) => {
          if(!err) return resolve(200)
          return reject(err)
        });
      })
      .catch(e => reject(e))
    });
  }

  updateUserOwns(userId, placeId) {
    return new Promise((resolve, reject) => {
      Promise.resolve(User.findOne({googleId: userId}))
      .then(data => {
        let userOwns = data.owns;
        userOwns.push(placeId);

        Promise.resolve(User.findOneAndUpdate({googleId: userId}, {owns: userOwns}))
        .then(() => resolve(200))
        .catch(e => reject(e));
      })
    });
  }

  deleteFavourite(place, author) {
    return new Promise((resolve, reject) => {
      const favouriteData = {place, author}

      Promise.all([
        Place.findById(favouriteData.place),
        User.findOne({googleId: favouriteData.author})
      ])
      .then(([placeData, userData]) => {
        let placeCurrentFavourites = placeData.favourites;
        let userCurrentFavourites = userData.favourites;
        let deletedFav = userCurrentFavourites.filter(fav => fav.placeId !== favouriteData.place);

        Promise.all([
          Place.findByIdAndUpdate(favouriteData.place, {favourites: placeCurrentFavourites - 1}, {upsert: true}),
          User.findOneAndUpdate({googleId: favouriteData.author}, {favourites: deletedFav}, {upsert: true})
        ])
        .then(success => resolve(200))
        .catch(err => reject(err));
      })
      .catch(err => reject(err));
    });
  }

  editPlaceReview(review, id) {
    return new Promise((resolve, reject) => {
      console.log(id)
      Promise.resolve(Review.findByIdAndUpdate(id, review))
      .then(res => {
        console.log(res)
        review.id = id;

        this.updateUserAndPlaceReviews(review)
        .then(success => resolve(200))
        .catch(err => reject(err));
      })
      .catch(err => reject(err));
    });
  }
}

module.exports = DbController;