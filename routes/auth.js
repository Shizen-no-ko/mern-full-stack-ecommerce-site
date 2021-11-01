const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const CryptoJS = require('crypto-js');

const User = require('../models/User');

router.post('/register', body('email').isEmail(), body('password').isLength({ min: 6 }), body('username').isLength({ min: 1 }), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPTION_SECRET);
    const newUser = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword
        }
    );
    // console.log(newUser);
    const saved = await newUser.save();
    console.log(`${saved} is saved in DB`);
    // const {password, ...restOfBody} = req.body;
    res.send("data received");
});

router.post('/login', body('email').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        await User.findOne({ email: req.body.email }, function (err, user) {
            if(!user){
                res.status(401).json("User not found");
            }
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
            console.log(decryptedPassword);
            console.log(decryptedPassword === req.body.password);
            if(decryptedPassword === req.body.password){
                res.status(200).json("User has been found");
            }
        });
    }
    catch {
        (err) => console.log(err)
    }
    



    // const { password, ...restOfBody } = req.body;
    // res.send(restOfBody);
    // var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");

});



module.exports = router;