const router = require('express').Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkAdmin = require('../middleware/checkAdmin');

const Order = require('../models/Order');
const checkAuthorizedToEdit = require('../middleware/checkAuthorizedToEdit');

const now = new Date();
const twoMonthsAgo = new Date(now.setMonth(now.getMonth() - 12));



router.post('/add', tokenAuth, checkAuthorizedToEdit, async (req, res) => {
    try {
        const newlyCreatedOrder = new Order(req.body);
        await newlyCreatedOrder.save((err, order) => {
            if (err) return res.status(500).json({ errors: [{ msg: "Create Order Error" }] });
            return res.status(200).json(order);
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
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        return res.status(200).json(updatedOrder);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.delete('/:id', tokenAuth, checkAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json("Order has been deleted");
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Deletion Error" }] });
    }
});

router.get('/find/:userId', tokenAuth, checkAuthorizedToEdit, async (req, res) => {
    try {
        const foundOrder = await Product.find({ userId: req.params.userId });
        return res.status(200).json(foundOrder);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.get('/all', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const allOrders = await Order.find();
        return res.status(200).json(allOrders);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
})

router.get('/sales', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const previousMonthsData = await Order.aggregate([
            { $match: { createdAt: { $gte: twoMonthsAgo } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    total: "$totalPrice"
                }
            },
            { $group: { _id: "$month", sum: { $sum: "$total" } } }
        ]);
        return res.status(200).json(previousMonthsData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

module.exports = router;