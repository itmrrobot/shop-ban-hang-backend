const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const {auth,authRole} = require('../midleware/auth');
const ROLE = require('../role');

router.get('/orders',auth,authRole(ROLE.ADMIN),async (req,res) => {
    try {
        const orders = await Order.find({});
        res.send(orders);
    } catch(e) {
        res.status(500).send();
    }
})

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
        userId: req.user._id,
        userName: req.user.name
    });
    try {
        await order.save();
        res.status(201).send(order);
    } catch(e) {
        res.status(400);
    }
})

router.patch("/orders/:id",auth,authRole(ROLE.ADMIN),async (req,res) => {
    const update = Object.keys(req.body);
    const updatedAllowed = ["_id","orderDate","status","total","userName"];
    const isValidOperation = update.every(update => updatedAllowed.includes(update));
    if(!isValidOperation) return res.status(400).send({error:'Invalid update!'})
    try {
        const order = await Order.findOne({_id:req.params.id});
        
        if(!order) return res.status(404).send();
        update.forEach(update => order[update]=req.body[update]);
        await order.save();
        res.send(order);
    } catch(e) {
        res.status(400).send();
    }
})

router.delete("/orders/:id",auth,authRole(ROLE.ADMIN),async(req,res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).send(order);
    } catch(e) {
        res.status(500).send();
    }
})

router.delete("/orders",auth,authRole(ROLE.ADMIN),async(req,res) => {
    try {
        const orders = await Order.deleteMany({});
        res.status(200).send();
    } catch(e) {
        res.status(500).send();
    }
})

module.exports = router;