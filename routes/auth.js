const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

router.post('/register', body('email').isEmail(), body('password').isLength({ min: 6 }), body('username').isLength({ min: 1 }),  (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
    const { password, ...restOfBody } = req.body;
    res.send(restOfBody);
});



module.exports = router;