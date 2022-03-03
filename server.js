require('dotenv').config()
const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const shoppingCartRoute = require('./routes/shoppingCart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

const PORT = process.env.PORT || 5000;

const app = express();


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connected successfully"))
.catch((err) => console.log(err));

// Cross Origin
app.use(cors());

// Routes
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', shoppingCartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);



app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
