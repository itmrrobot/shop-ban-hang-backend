const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const {auth} = require('../midleware/auth');

router.get('/orders',auth,async(req,res) => {
    try {
        const order = await Order.find({userId:req.user._id});
        if(!order) return res.status(404).send();
        res.send(order);
    } catch(e) {
        res.status(500).send();
    }
})

router.post('/orders',auth,async(req,res) => {
    const order = new Order({
        ...req.body,
        userId: req.user._id
    });
    try {
        await order.save();
        res.status(201).send(order);
    } catch(e) {
        res.status(400);
    }
})

module.exports = router;