const mongoose = require('mongoose');
// create model for authorization
const model = mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String,
        unique: true
    },
    password:{
        required: true,
        type: String
    }
});
const authModel = mongoose.model('AUTHMODEL', model);
module.exports = authModel