const router = require('express').Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkAdmin = require('../middleware/checkAdmin');

const Product = require('../models/Product');

router.post('/add', tokenAuth, checkAdmin, async (req, res) => {
    try {
        let preExist = await Product.findOne({ title: req.body.title });
        if (preExist) {
            return res.status(400).json({ errors: [{ msg: "This product title already exists" }] });
        }
        const newProduct = new Product(req.body);
            await newProduct.save((err, product) => {
                if(err) return res.status(500).json({ errors: [{ msg: "Create Product Error" }] });
                return res.status(200).json(product);
        })
    }
     catch {
        (err) => {
            console.log(err)
            res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }
    }
});


router.put('/:id', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
          $set:req.body
        }, { new: true });
        return res.status(200).json(updatedProduct);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id)
        return res.status(200).json(foundProduct);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.get('/all', async (req, res) => {
    newQuery = req.query.new;
    categoryQuery = req.query.category;
    colorQuery = req.query.color;
    console.log(Object.keys(req.query)[0]);
    let productResult;
    try {
        if(newQuery){
           productResult = await Product.find().sort({ _id: -1 }).limit(5)
        } else if(categoryQuery){
            productResult = await Product.find({category: categoryQuery});
        } 
     else if(colorQuery){
        productResult = await Product.find({color: colorQuery});
    }
        else {
            productResult = await Product.find();
        }
       
        return res.status(200).json(productResult);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.delete('/:id', tokenAuth, checkAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json("Product has been deleted");
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Deletion Error" }] });
    }
});


module.exports = router;