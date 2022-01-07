const mongoose = require('mongoose');

const DeletedProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: Array
        },
        size: {
            type: Array
        },
        color: {
            type: Array
        },
        price: {
            type: Number,
            required: true
        },
        inStock: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("DeletedProduct", DeletedProductSchema);