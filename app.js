const express = require('express');
const app = express();
// require routes
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./router/routes');

// middleware
app.use(express.json());
app.use('/api/v1/products', routes);
// app.use((err, req, res, next) => {
//     if(err){
//         return next(err)
//     }
//     next()
// })
app.use(errorHandler);
app.use(notFound);

module.exports = app