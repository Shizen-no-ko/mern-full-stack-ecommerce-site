const router = require('express').Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkAdmin = require('../middleware/checkAdmin');

const Product = require('../models/Product');
const DeletedProducts = require('../models/DeletedProduct');
const DeletedProduct = require('../models/DeletedProduct');

router.post('/add', tokenAuth, checkAdmin, async (req, res) => {
    try {
        let preExist = await Product.findOne({ title: req.body.title });
        if (preExist) {
            return res.status(400).json({ errors: [{ msg: "This product title already exists" }] });
        }
        const newProduct = new Product(req.body);
        await newProduct.save((err, product) => {
            if (err) return res.status(500).json({ errors: [{ msg: "Create Product Error" }] });
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
            $set: req.body
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
    queryType = Object.keys(req.query)[0];
    queryValue = req.query[queryType];
    let productResult;
    try {
        switch (queryType) {
            case 'new':
                productResult = await Product.find().sort({ _id: -1 }).limit(3);
                break;
            case 'category':
                productResult = await Product.find({ category: queryValue });
                break;
            case 'color':
                productResult = await Product.find({ color: queryValue });
                break;
            default:
                productResult = await Product.find();
        }
        return res.status(200).json(productResult);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.get('/deleted', async (req, res) => {
    let productResult;
    try {
        productResult = await DeletedProduct.find();
        return res.status(200).json(productResult);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.delete('/:id', tokenAuth, checkAdmin, async (req, res) => {
    const id = (req.params.id);
    try {
        let toDeleteProduct = await Product.findById(id);
        toDeleteProduct = toDeleteProduct.toObject();
        delete toDeleteProduct._id;
        const newDeletedProduct = new DeletedProduct(toDeleteProduct);
        await newDeletedProduct.save((err, product) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ errors: [{ msg: "Backup Product Error" }] });
            }
        })
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ errors: [{ msg: "Product has been deleted" }] });
    }
    catch {
        (err) => {
            console.log(err)
            res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }
    }
});


module.exports = router;