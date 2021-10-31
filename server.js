require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

const PORT = process.env.PORT || 5000;

const app = express();


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connected successfully"))
.catch((err) => console.log(err));

// Routes
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
