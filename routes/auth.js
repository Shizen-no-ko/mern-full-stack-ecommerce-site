const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require('../models/User');



// Register user in DB with express-validator input validation
router.post('/register', 
body('email').isEmail().withMessage("Please enter a valid email"), 
body('password').isLength({ min: 6 }).withMessage("Password must contain at least 6 characters"),
body('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
        // Error if passwords don't match
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }).withMessage("Passwords don't match.")
, 
body('username').isLength({ min: 1 }).withMessage("Username must not be empty"), 
async (req, res) => {
    // Set errors array
    const errors = validationResult(req);
    // If there are errors, set response to these errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check if user is already registered
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "Incorrect Credentials" }] });
        }
        // Generate encrypted password
        const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPTION_SECRET);
        // Create new user and generate payload for JWT token
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
                    id: user.id,
                    isAdministrator: user.isAdministrator
                }
            };
            // Generate JWT token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
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


// Login user with express-validator input validation
router.post('/login/:isAdmin', body('email').isEmail(), async (req, res) => {
    // Uses same post route for admin and main pages, checks trailing param for main or admin and
    //  sets isAminRoute constant accordingly and uses this for condition later in route
    const isAdminRoute = req.params.isAdmin === 'admin' ? true : false;
    // Set errors array, and return errors response if there are any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check if user exists, and return error if none
        await User.findOne({ email: req.body.email }, function (err, user) {
            if (!user) {
                return res.status(401).json({ errors: [{ msg: "Incorrect Credentials" }] });
            }
            // If user exists, decrypt their password and compare against given password from login form
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
            // If no match, return error response
            if (decryptedPassword !== req.body.password) {
                return res.status(401).json({ errors: [{ msg: "Incorrect Credentials" }] });
            }
            // Only checks this condition if this route was accessed through the admin page
            if(isAdminRoute && !user.isAdministrator){
                return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
            }
            // Sets payload for JWT token
            const payload = {
                user: {
                    id: user.id,
                    isAdministrator: user.isAdministrator
                }
            };
            // Sets JWT token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' },
                (err, token) => {
                    if (err) console.log(err);
                    // remove password from response
                    delete user._doc.password;
                    res.json({ token, user });
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



module.exports = router;