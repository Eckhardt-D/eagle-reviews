const router = require('express').Router();
const User   = require('../database/models/User');

router.get('/user/:id', (req, res) => {
    const googleId = req.params.id;

    User.findOne({googleId})
    .then(data => {
        res.json(data)
    })
    .catch(e => console.log(e));
});

module.exports = router;