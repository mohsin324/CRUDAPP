const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String
    },
    company: {
        required: true,
        type: String
    },
    available:{
        required: true,
        type: Boolean
    }
});
const productSchema = mongoose.model('PRODUCTS', schema);
module.exports = productSchema