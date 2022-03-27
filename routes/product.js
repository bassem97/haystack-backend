const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();

router.route('/')
    .get(productController.list)
    .post(productController.create);

router.route('/myproducts')
    .get(productController.getMyProducts);

router.route('/:id')
    .get(productController.get)
    .put(productController.edit)
    .delete(productController.remove);

module.exports = router;
