const router = require('express').Router();
const CryptoJS = require('crypto-js');

const tokenAuth = require('../middleware/tokenAuth');
const checkAuthorizedToEdit = require('../middleware/checkAuthorizedToEdit');
const checkAdmin = require('../middleware/checkAdmin');

const User = require('../models/User');

const currentYear = new Date(new Date().getFullYear());
const endOfPreviousYear = new Date(currentYear - 1, 11, 31);
const startSortDate = endOfPreviousYear;


// Get user by id
router.get('/find/:id', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id)
        const { password, ...userWithoutPassword } = foundUser._doc;
        return res.status(200).json(userWithoutPassword);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

//Get all users
router.get('/all', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const allUsers = await User.find().select('-password');
        return res.status(200).json(allUsers);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

// User count per month for the last year
router.get('/recent', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const recentUserData = await User.aggregate([
            { $match: { createdAt: { $gte: startSortDate } } },
            {
                $project: { month: { $month: "$createdAt" } }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        return res.status(200).json(recentUserData);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

// Get 10 most recent registered users
router.get('/latest', tokenAuth, checkAdmin, async (req, res) => {
    try {

        const tenMostRecent = await User.find().sort({ createdAt: -1 }).limit(10).select('-password');
        return res.status(200).json(tenMostRecent);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

// Update liked products array for currently logged in user
router.get('/updateCurrent/:id', tokenAuth, async (req, res) => {
    try {
        const result = await User.findById(req.params.id).select('likedProducts');
        return res.status(200).json(result.likedProducts);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});


// Update user
router.put('/:id', tokenAuth, checkAuthorizedToEdit, async (req, res) => {
    if (req.body.password) {
        encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPTION_SECRET).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword,
            isAdministrator: req.body.isAdministrator
        }, { new: true });
        const { password, ...userWithoutPassword } = updatedUser._doc;
        return res.status(200).json(userWithoutPassword);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});


// Toggles users likes in DB; if product already in likedProducts then remove, otherwise add.
router.patch('/toggleLike/:id/:productId', tokenAuth, async (req, res) => {
    try {
        const result = await User.findById(req.params.id).select('likedProducts');
        const index = result.likedProducts.indexOf(req.params.productId);
        if (index > -1) {
            result.likedProducts.splice(index, 1);
        }
        else {
            result.likedProducts.push(req.params.productId);
        } 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            likedProducts: result.likedProducts
        }, { new: true });
        return res.status(200).json('Updated Successfully');
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});


// Delete user
router.delete('/:id', tokenAuth, checkAuthorizedToEdit, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted");
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});


module.exports = router;

