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
                },
                color: {
                    type: String
                },
                size: {
                    type: String
                }
            }
        ],
        subTotal: {
            type: Number,
            required: true
        },
        deliveryCharge: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        userAddress: {
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