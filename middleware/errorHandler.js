// const { StatusCodes } = require('http-status-codes')
const errorHandler = (err, req, res, next) => {
    console.log('error handler')
    console.log(err)
    return res.status(404).json({ message: 'failure in error handler', data: err})
}
module.exports = errorHandler