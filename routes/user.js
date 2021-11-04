const router = require('express').Router();
const CryptoJS = require('crypto-js');

const tokenAuth = require('../middleware/tokenAuth');
const checkAuthorizedToEdit = require('../middleware/checkAuthorizedToEdit');

const User = require('../models/User');


router.get('/test', (req, res) => {
    res.send("Test Works");
});

router.put('/:id', tokenAuth, checkAuthorizedToEdit,  async (req, res) => {
    if(req.body.password){
        encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPTION_SECRET).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword,
            isAdministrator: req.body.isAdministrator
        }, {new: true});
        console.log("username is");
        console.log(req.body.username);
        const { password, ...userWithoutPassword } = updatedUser._doc;
        return res.status(200).json(userWithoutPassword);
    } 
    catch(err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.patch('/:id', tokenAuth, checkAuthorizedToEdit, (req, res) => {
    res.send('Middleware Working');
});

router.delete('/:id', tokenAuth, checkAuthorizedToEdit,  async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json( "User has been deleted");
    }
    catch(err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
    
});


module.exports = router;

