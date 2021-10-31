const mongoose = require('mongoose');

const ShoppingCartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        items: [
            {
                itemId: {
                    type: String,
                },
                amount: {
                    type: Number,
                    default: 1
                }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);