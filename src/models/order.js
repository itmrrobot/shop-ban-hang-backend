const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId:{
        type: String,
        required: true,
        trim: true,
        unique :true
    },
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
    },
    userName: {
        type: String,
        required: true
    }
})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;