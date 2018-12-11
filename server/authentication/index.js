const jwt = require('jsonwebtoken');

require('dotenv').config();

const createUserToken = profile => {
  makeToken(profile);
}

function makeToken (user) {
  return new Promise((resolve, reject) => {
    const tokenData = {id: user.googleId, firstname: user.firstname, email: user.email};
    const token = jwt.sign(tokenData, process.env.token_secret);

    if(token !== null && typeof token !== 'undefined') {
      return resolve({
        user: user,
        token: token
      })
    } else {
      return reject('Error: Could not create token from user');
    }
  })
} 


module.exports = createUserToken;