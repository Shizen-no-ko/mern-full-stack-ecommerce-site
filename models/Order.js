const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
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
        ],
        totalPrice: {
            type: number,
            required: true
        },
        userAddress : {
            type: Object,
            required: true
        },
        status: {
            type: String,
            default: "Order Received"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);