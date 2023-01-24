const { StatusCodes } = require('http-status-codes');
const notFound = (req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).send(`not found with this url ${req.url}`);
}
module.exports = notFound