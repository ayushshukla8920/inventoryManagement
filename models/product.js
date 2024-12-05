const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    }
});

const product = mongoose.model('products',productSchema);

module.exports = product;