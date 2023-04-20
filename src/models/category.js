const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    image: {
        type: String
    }
},{
    timestamps: true
})

const Category = mongoose.model('Category',categorySchema);

module.exports = {Category,categorySchema};