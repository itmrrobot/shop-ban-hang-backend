const mongoose = require('mongoose');
const {categorySchema} = require('./category');

const productSchema = mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: categorySchema,
    images: [
        {
            type: String
        }
    ]
},{
    timestamps: true
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;