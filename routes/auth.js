const { body } = require('express-validator');
const router = require('express').Router();


const User = require('../models/User');

router.post('/register', (req, res) => {
    const newUser = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
    }
    );
    console.log(newUser);
    // const {password, ...restOfBody} = req.body;
    res.send("data received");
});

router.post('/login', (req, res) => {
    const {password, ...restOfBody} = req.body;
    res.send(restOfBody);
});



module.exports = router;