const express = require('express');
const productController = require('../controllers/product');
const userController = require('../controllers/user');
const passport = require("passport");
const router = express.Router();


router.route('/')
    .get(userController.getUsers)

router.route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);




// router.route('/login/google')
//     .get(passport.authenticate('google'))
// .delete(userController.delete);

module.exports = router;
