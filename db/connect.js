require('dotenv').config();
const mongoose = require('mongoose');
const mongodbURL = process.env.MongoURI;
const connect = mongoose.connect(mongodbURL, {
    useNewUrlParser: false
});

module.exports = connect