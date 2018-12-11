const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (user) => (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    
    jwt.verify(bearerToken, process.env.token_secret, (err, safeUser) => {
      if(safeUser.googleId === user.googleId && safeUser.email === user.email && !err) {
        next();
      } else {
        res.status(403);
      }
    })
  } else {
    res.status(403);
  }
}

module.exports = verifyToken;