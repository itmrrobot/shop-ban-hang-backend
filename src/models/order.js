const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderDate: {
        type:Date,
    },
    paymentMethod: {
        type: String
    },
    status: {
        type: String,
    },
    total: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;