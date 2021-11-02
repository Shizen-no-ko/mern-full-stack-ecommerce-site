// require('dotenv').config();
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/register', body('email').isEmail(), body('password').isLength({ min: 6 }), body('username').isLength({ min: 1 }), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }
        const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPTION_SECRET);
        const newUser = new User(
            {
                username: req.body.username,
                email: req.body.email,
                password: encryptedPassword
            }
        );
            await newUser.save((err, user) => {
                if(err) console.log(err);
            const payload = {
                user: {
                    id: user.id
                }
            };
    
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) console.log(err);
                    res.json({ token });
                });
            });
        }
     catch {
        (err) => {
            console.log(err)
            res.status(500).json("Server Error");
        }
    }
});

router.post('/login', body('email').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        await User.findOne({ email: req.body.email }, function (err, user) {
            if (!user) {
                return res.status(401).json("User not found");
            }
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
            console.log(decryptedPassword);
            console.log(decryptedPassword === req.body.password);
            if (decryptedPassword !== req.body.password) {
                return res.status(401).json("Incorrect password");
            }
            const { password, ...userWithoutPassword } = user._doc;
            return res.status(200).json(userWithoutPassword);
        });
    }
    catch {
        (err) => console.log(err)
    }
});



module.exports = router;