const express     = require('express');
const cors        = require('cors');
const bodyParser  = require('body-parser');
const db          = require('./database');
const Review      = require('./database/models/Review');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({
    msg: 'Welcome!'
  })
});

app.get('/reviews', (req, res) => {
  Review.find({}, (err, data) => {
    res.json(data);
  });
})

app.listen(process.env.PORT || 5000, () => 
  process.env.PORT ? console.log('Listening on port '+ process.env.PORT) : console.log('Listening on http://localhost:5000'));