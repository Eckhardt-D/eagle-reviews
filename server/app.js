const express     = require('express');
const cors        = require('cors');
const bodyParser  = require('body-parser');

require('./database');

const Review  = require('./database/models/Review');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({
    msg: 'Hello!'
  })
})

app.listen(process.env.PORT || 5000, () => 
  process.env.PORT ? console.log('Listening on port '+ process.env.PORT) : console.log('Listening on http://localhost:5000'));