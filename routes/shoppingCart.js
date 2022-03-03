// Mostly unused due to use of Redux
const router = require('express').Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkAdmin = require('../middleware/checkAdmin');
const checkAuthorizedToEdit = require('../middleware/checkAuthorizedToEdit');

const ShoppingCart = require('../models/ShoppingCart');


// Add Shopping Cart 
router.post('/add', tokenAuth, async (req, res) => {
    try {
        // Check if already existing in DB
        preexisting = await ShoppingCart.find({ userId: req.user.id });
        if (preexisting) {
            console.log("already exists");
            return res.status(200).json(preexisting);
        }
        // Otherwise create
        const newCart = new ShoppingCart({ userId: req.user.id });
        await newCart.save((err, cart) => {
            if (err) return res.status(500).json({ errors: [{ msg: "Create Cart Error" }] });
            return res.status(200).json(cart);
        })
    }
    catch {
        (err) => {
            console.log(err)
            res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }
    }
});

// Update Cart
router.put('/:id', tokenAuth, checkAuthorizedToEdit, async (req, res) => {
    try {
        const updatedCart = await ShoppingCart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        return res.status(200).json(updatedCart);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

// Retrieve Cart
router.get('/find/:userId', tokenAuth, checkAuthorizedToEdit, async (req, res) => {
    try {
        const foundCart = await ShoppingCart.findOne({ userId: req.params.userId });
        return res.status(200).json(foundCart);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});


// Get all stored carts
router.get('/all', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const allCarts = await ShoppingCart.find();
        return res.status(200).json(allCarts);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
})


// Delete Cart by id
router.delete('/:id', tokenAuth, checkAuthorizedToEdit, async (req, res) => {
    try {
        await ShoppingCart.findByIdAndDelete(req.params.id);
        return res.status(200).json("Shopping Cart has been deleted");
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Deletion Error" }] });
    }
});

module.exports = router;