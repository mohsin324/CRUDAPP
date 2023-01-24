const express = require('express');
const router = express.Router();
const authenticationMiddleWare = require('../middleware/auth');
// require controller
const { getAllProduct, addProduct, signUP, login, deleteProduct, updateProduct } = require('../controller/controller');

router.route('/').get(authenticationMiddleWare, getAllProduct);
router.route('/addProduct').post(addProduct);
router.route('/singup').post(signUP);
router.route('/login').get(authenticationMiddleWare, login);
router.route('/delete/:id').delete(authenticationMiddleWare, deleteProduct);
router.route('/update/:id').put(authenticationMiddleWare, updateProduct);

module.exports = router