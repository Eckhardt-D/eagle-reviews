const express     = require('express');
const cors        = require('cors');
const bodyParser  = require('body-parser');
const db          = require('./database');

const app = express(); // Init app

app.use(cors());
app.use(bodyParser.json());

/**********
 * ROUTES *
 * ********/

//  Test rout
app.get('/', (req, res) => {
  res.json({
    msg: 'Welcome!'
  });
});

// Places routes
app.use(require('./routes/placeRoutes'));

// Reviews routes
app.use(require('./routes/reviewRoutes'));

// User routes
app.use(require('./routes/userRoutes'));

/**SERVER START */
app.listen(process.env.PORT || 5000, () => 
  process.env.PORT ? console.log('Listening on port '+ process.env.PORT) : console.log('Listening on http://localhost:5000'));