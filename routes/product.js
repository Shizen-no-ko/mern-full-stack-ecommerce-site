const router = require('express').Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkAdmin = require('../middleware/checkAdmin');

const Product = require('../models/Product');
const DeletedProduct = require('../models/DeletedProduct');


// Create new product
router.post('/add', tokenAuth, checkAdmin, async (req, res) => {
    try {
        // Check is title already exists
        let preExist = await Product.findOne({ title: req.body.title });
        if (preExist) {
            return res.status(400).json({ errors: [{ msg: "This product title already exists" }] });
        }
        // If title is unique, create product
        const newProduct = new Product(req.body);
        await newProduct.save((err, product) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ errors: [{ msg: "Create Product Error" }] });
            }
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


// Reinstate a deleted product back into shop
router.post('/reinstate/:id', tokenAuth, checkAdmin, async (req, res) => {
    const id = (req.params.id);
    try {
        let toReinstateProduct = await DeletedProduct.findById(id);
        toReinstateProduct = toReinstateProduct.toObject();
        // Strip _id so that new one can be created
        delete toReinstateProduct._id;
        // Add to-reinstate product to products DB
        const newProduct = new Product(toReinstateProduct);
        await newProduct.save((err, product) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ errors: [{ msg: "Reinstate Product Error" }] });
            }
        })
        // Remove from deleted products DB
        await DeletedProduct.findByIdAndDelete(id);
        return res.status(200).json({ errors: [{ msg: "Product has been reinstated" }] });
    }
    catch {
        (err) => {
            console.log(err)
            res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }
    }
});



// Update Product Details
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


// Retrieve product by id
router.get('/find/:id', async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id)
        return res.status(200).json(foundProduct);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

//finds all products matching array of ids
router.get('/findall/:ids', async (req, res) => {
    try {
        // split ids string into array so it can be passed to mongoose
        ids = req.params.ids.split(',');
        const foundProducts = await Product.find({}, 'title price').where('_id').in(ids).exec();
        return res.status(200).json(foundProducts);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
})

//finds all favorite products matching array of ids
router.get('/findfaves/:ids', async (req, res) => {
    try {
        // split ids string into array so it can be passed to mongoose
        ids = req.params.ids.split(',');
        const foundProducts = await Product.find().where('_id').in(ids).exec();
        return res.status(200).json(foundProducts);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
})

// Conditional Retrieval of Products
router.get('/all', async (req, res) => {
    queryType = Object.keys(req.query)[0];
    queryValue = req.query[queryType];
    let productResult;
    try {
        switch (queryType) {
            // Most recent
            case 'new':
                productResult = await Product.find().sort({ _id: -1 }).limit(3);
                break;
            // By category
            case 'category':
                productResult = await Product.find({ category: queryValue });
                break;
            // By color
            case 'color':
                productResult = await Product.find({ color: queryValue });
                break;
            // By size
            case 'size':
                productResult = await Product.find({ size: queryValue });
                break;
            // By title
            case 'title':
                productResult = await Product.find({ title: queryValue });
                break;
            // 'searchcategory' to differentiate from 'category' above
            case 'searchcategory':
                productResult = await Product.find({ category: queryValue });
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

// Get keywords for setting dropdown selectors
router.get('/keywords', async (req, res) => {
    try {
        const productResult = await Product.find({}, 'title color size category');
        return res.status(200).json(productResult);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});


// Retrieve Deleted Products
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

// First Backup then Delete Product
router.delete('/:id', tokenAuth, checkAdmin, async (req, res) => {
    const id = (req.params.id);
    try {
        let toDeleteProduct = await Product.findById(id);
        // check if product with this title is already backed-up
        let preExist = await DeletedProduct.findOne({ title: toDeleteProduct.title });
        // if this product not backed-up, store in backup
        if (!preExist) {
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
        }
        // delete product from products database
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