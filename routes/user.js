const router = require('express').Router();
const CryptoJS = require('crypto-js');

const tokenAuth = require('../middleware/tokenAuth');
const checkAuthorizedToEdit = require('../middleware/checkAuthorizedToEdit');
const checkAdmin = require('../middleware/checkAdmin');

const User = require('../models/User');

const startSortDate = "2021-11-02T09:58:15.289+00:00";



router.get('/find/:id', tokenAuth, checkAdmin, async (req, res) => {
    try{
        const foundUser = await User.findById(req.params.id)
        const { password, ...userWithoutPassword } = foundUser._doc;
        return res.status(200).json(userWithoutPassword);
    }
    catch(err){
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.get('/all', tokenAuth, checkAdmin, async (req, res) => {
    try{
        const allUsers = await User.find().select('-password');
        return res.status(200).json(allUsers);
    }
    catch(err){
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.get('/recent', tokenAuth, checkAdmin, async (req, res) => {
    try{
        const recentUsers = await User.find(
            {"createdAt": {"$gte": startSortDate,
             "$lt": new Date()}}
             ).sort("-createdAt").select('-password');
               return res.status(200).json(recentUsers);  
    }
    catch(err){
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
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

