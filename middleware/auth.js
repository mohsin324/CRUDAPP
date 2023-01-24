require('dotenv').config();
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
// JWT secrete 
const JWT_Secrete = process.env.JWT_Secrete;
const authenticationMiddleWare = async (req, res, next) => {
    const authHeader = await req.headers.authorization;
    // authHeader is not null
    if(!authHeader || authHeader.startsWith('Bearer  ')){
        const error = new Error();
        error.message = `not authorized to get data`;
        error.StatusCodes = StatusCodes.BAD_GATEWAY;
        return next(error);
    }
    // splitting the authHeader for getting back token
    const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token, JWT_Secrete);
        console.log(JSON.stringify(decode)+ ' decode ');
        const { id, name } = decode
        req.user = { id, name }
        next();
    }catch(err){
        const error = new Error();
        error.message = `bad token`;
        error.StatusCodes = StatusCodes.UNAUTHORIZED;
        return next(error);
    }
}

module.exports = authenticationMiddleWare