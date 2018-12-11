const router = require('express').Router();
const User   = require('../database/models/User');
const DbController = require('../controllers/dbController');
const makeUserToken = require('../authentication');
const db = new DbController();

router.get('/user/:id', (req, res) => {
    const googleId = req.params.id;

    User.findOne({googleId})
    .then(data => {
        res.json(data)
    })
    .catch(e => console.log(e));
});

router.post('/users', (req, res) => {
    db.checkOrCreateUser(req.body)
    .then(user => {
        makeUserToken(user)
        .then(data => res.json(data))
        .catch(err => res.send(err))
    })
    .catch(e => res.send(e));
});


module.exports = router;