const router = require('express').Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkAdmin = require('../middleware/checkAdmin');

const Product = require('../models/Product');

router.post('/add', tokenAuth, checkAdmin, async (req, res) => {
    try {
        let preExist = await Product.findOne({ title: req.body.title });
        if (preExist) {
            return res.status(400).json("This product title already exists");
        }
        const newProduct = new Product(req.body);
            await newProduct.save((err, product) => {
                if(err) return res.status(500).json("Create Product Error");
                return res.status(200).json(product);
        })
    }
     catch {
        (err) => {
            console.log(err)
            res.status(500).json("Server Error");
        }
    }
});


module.exports = router;