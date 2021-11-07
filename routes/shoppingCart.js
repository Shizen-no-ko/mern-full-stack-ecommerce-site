const router = require('express').Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkAdmin = require('../middleware/checkAdmin');
const checkAuthorizedToEdit = require('../middleware/checkAuthorizedToEdit');

const ShoppingCart = require('../models/ShoppingCart');

router.post('/add', tokenAuth, async (req, res) => {
    try {
        preexisting = await ShoppingCart.find({userId: req.user.id});
        if(preexisting){
            console.log("already exists");
            return res.status(200).json(preexisting);
        }
        const newCart = new ShoppingCart({userId: req.user.id});
            await newCart.save((err, cart) => {
                if(err) return res.status(500).json({ errors: [{ msg: "Create Cart Error" }] });
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


router.put('/:id', tokenAuth, checkAuthorizedToEdit, async (req, res) => {
    try {
        const updatedCart = await ShoppingCart.findByIdAndUpdate(req.params.id, {
          $set:req.body
        }, { new: true });
        return res.status(200).json(updatedCart);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});


module.exports = router;