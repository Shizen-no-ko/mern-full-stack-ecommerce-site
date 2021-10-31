require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connected successfully"))
.catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Server Running'));

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
