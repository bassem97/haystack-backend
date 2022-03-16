const express = require('express');
const productController = require('../controllers/product');
const userController = require('../controllers/user');
const router = express.Router();

router.route('/')
    .get(userController.list)

router.route('/:id')
    .get(userController.get)
    .put(userController.edit)
    .delete(userController.remove);

router.route('/signup')
    .post(userController.signUp)
    .get(userController.get)
    // .delete(userController.delete);

router.route('/create')
    .post(userController.create)
// .delete(userController.delete);

module.exports = router;
