const { StatusCodes } = require('http-status-codes');
// production schema
const productSchema = require('../model/product');
// auth schema
const authModel = require('../model/authModel');
// json web token
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
// jwt secrete
const JWT_Secrete = process.env.JWT_Secrete;

// login
const login = async(req, res, next) => {
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            const error = new Error();
            error.message = `please fill all the required fields`;
            error.status = StatusCodes.BAD_REQUEST;
            return next(error);
        }
        const findUser = await authModel.findOne({ email: email });
        if(!findUser){
            const error = new Error();
            error.message = `user does not exist`;
            error.status = StatusCodes.NOT_FOUND;
            return next(error);
        }
        console.log(findUser);
        const id = findUser._id;
        console.log('id '+id);
        const token = jwt.sign({id, name}, JWT_Secrete, { expiresIn: '30d'})
        return res.status(StatusCodes.OK).json({ message: 'success', responseDescription: 'user exist', responseCode: StatusCodes.OK, token: token});
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'failure', responseDescription: 'some thing went wrong', responseCode: StatusCodes.BAD_REQUEST, token: err});
    }
}

// signUP
const signUP = async(req, res, next) => {
    try{
        const singUp = await authModel.create(req.body);
        if(!singUp){
            const error = new Error();
            error.message = `please provide name, email and password`;
            error.statusCode = StatusCodes.BAD_REQUEST
            return next(error);
        }
        return res.status(StatusCodes.OK).json({ message: 'success', responseDescription: 'user created', responseCode: StatusCodes.OK, user: singUp});
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'failure', responseCode: StatusCodes.BAD_REQUEST, user: err});
    }

}
// getAll products from db
const getAllProduct = async(req, res, next) => {
    try{
        const getAllProduct = await productSchema.find({});
        if(!getAllProduct){
            const error = new Error();
            error.message = `Bad Request`;
            error.statusCode = StatusCodes.BAD_REQUEST
            return next(error);
        }
        return res.status(StatusCodes.OK).json({ message: 'success', responseCode: StatusCodes.OK, data: getAllProduct});
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'failure', responseCode: StatusCodes.BAD_REQUEST, data: err});
    }
}
// add Product into db
const addProduct = async(req, res, next) => {
    try{
        const add = await productSchema.create(req.body);
        if(!add){
            const error = new Error();
            error.message = `Not inserted values into db`;
            error.statusCode = StatusCodes.NOT_IMPLEMENTED
            return next(error);
        }
        return res.status(StatusCodes.OK).json({ message: 'success', responseCode: StatusCodes.OK, data: add});
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'failure', responseCode: StatusCodes.BAD_REQUEST, data: err});
    }
}
// delete product
const deleteProduct = async (req, res, next) => {
    try{
        const { id } = req.params;
        console.log(`id ${id}`);
        const deleteProduct = await productSchema.deleteOne({ _id: ObjectId(id)});
        if(!deleteProduct){
            const error = new Error();
            error.message = `product does not exist at same ${id}`;
            error.statusCode = StatusCodes.NOT_IMPLEMENTED
            return next(error);
        }
        return res.status(StatusCodes.OK).json({ message: 'success', responseCode: StatusCodes.OK, responseDescription: 'product deleted successfully!'});
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'failure', responseCode: StatusCodes.BAD_REQUEST, responseDescription: 'oops, something went wrong!'});
    }
}
// update product 
const updateProduct = async (req, res, next) => {
    try{
        const { name, price, company, available } = req.body;
        const { id } = req.params;
        console.log(`id ${id}`);
        // check if product exist or not 
        const findProduct = await productSchema.findOne({ _id: ObjectId(id)});
        if(!findProduct){
            const error = new Error();
            error.message = `product does not exist at same ${id}`;
            error.statusCode = StatusCodes.NOT_IMPLEMENTED
            return next(error);
        }
        // update product
        const updateProduct = await productSchema.updateOne({name, price, company, available});
        // check if product successfully updated or not
        if(!updateProduct){
            const error = new Error();
            error.message = `product does not updated at ${id}`;
            error.statusCode = StatusCodes.NOT_IMPLEMENTED
            return next(error);
        }
        return res.status(StatusCodes.OK).json({ message: 'success', responseCode: StatusCodes.OK, responseDescription: 'product updated successfully!', product: updateProduct});
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'failure', responseCode: StatusCodes.BAD_REQUEST, responseDescription: 'oops, something went wrong!'});
    }
}
module.exports = { getAllProduct, addProduct, signUP, login, deleteProduct, updateProduct }