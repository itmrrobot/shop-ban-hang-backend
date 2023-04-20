const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const {auth} = require('../midleware/auth');
const multer = require('multer');
const ROLE = require('../role');
const fs = require('fs');
const path = require('path');
const imagesPath = path.join(__dirname,'../../images/');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    }
  })

const upload = multer({
    storage: storage,
    limits: 1000000,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            cb(new Error('Please upload image'));
        }
        cb(null,true);
    }
});

router.get('/products',async(req,res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch(e) {
        res.status(500).send();
    }
})

router.get('/products/:id',async(req,res) => {
    const _id = req.params.id;
    try{
        const product = await Product.findById(_id);
        if(!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch(e) {
        res.status(500).send();
    }
})

router.post('/products',async(req,res) => {
    const products = new Product({
        ...req.body
        
    });
    try {
        await products.save();
        res.status(201).send(products);
    } catch(e) {
        res.status(400).send();
    }
})

router.patch('/products/:id',async(req,res) => {
    const update = Object.keys(req.body);
    const updatedAllowed = ["title","price","description","images"];
    const isValidOperation = update.every(update => updatedAllowed.includes(update));
    if(!isValidOperation) return res.status(400).send({error:'Invalid update!'})
    try {
        const product = await Product.findOne({_id:req.params.id});
        
        if(!product) return res.status(404).send();
        update.forEach(update => product[update]=req.body[update]);
        await product.save();
        res.send(product);
    } catch(e) {
        res.status(400).send();
    }
})

router.delete('/products/:id',async(req,res) => {
    try {
        const product = await Product.findOneAndDelete({_id:req.params.id});
        if(!product) return res.status(404).send();
        res.send(product);
    } catch(e) {
        res.status(500).send();
    }
})

router.post('/blog/upload',auth,upload.single('product-image'),async(req,res) => {
    res.send();
},(error,req,res,next) => {
    res.status(400).send({error:error.message});
})

module.exports = router;

