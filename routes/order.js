const router = require('express').Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkAdmin = require('../middleware/checkAdmin');

const Order = require('../models/Order');
const checkAuthorizedToEdit = require('../middleware/checkAuthorizedToEdit');

const now = new Date();
const twelveMonthsAgo = new Date(now.setMonth(now.getMonth() - 12));


router.post('/add', tokenAuth, async (req, res) => {
    try {
        const newlyCreatedOrder = new Order(req.body);
        await newlyCreatedOrder.save((err, order) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ errors: [{ msg: "Create Order Error" }] });
            } 
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

router.patch('/:id', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: { status: 'Dispatched'}
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

router.get('/find/:orderId', tokenAuth, checkAdmin,  async (req, res) => {
    try {
        const foundOrder = await Order.findById(req.params.orderId);
        return res.status(200).json(foundOrder);
    }
    catch (err) {
        console.log(err);
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
});

router.get('/active', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const activeOrders = await Order.find({status:"Order Received"}).exec();
        return res.status(200).json(activeOrders);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.get('/sales', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const previousMonthsData = await Order.aggregate([
            { $match: { createdAt: { $gte: twelveMonthsAgo } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                    total: "$totalPrice"
                }
            },
            { $group: { _id: {month: "$month", year: "$year"}, sum: { $sum: "$total" } } }
        ]);
        return res.status(200).json(previousMonthsData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

router.get('/topsellers', tokenAuth, checkAdmin, async (req, res) => {
    try {
        const topSellersData = await Order.aggregate([
            { $match: { createdAt: { $gte: twelveMonthsAgo } } },
            {
                "$unwind": "$items"
              },
              {
                '$group': {
                    '_id': '$items.itemId',
                       'count' :{ '$sum': '$items.amount' } 
                    
              }        
            }
            ]).sort({'count': -1}).limit(5);
        return res.status(200).json(topSellersData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});

module.exports = router;