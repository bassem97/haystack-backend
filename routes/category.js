const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();

router.route('/')
    .get(categoryController.list)
    .post(categoryController.create);

router.route('/:id')
    .get(categoryController.get)
    .put(categoryController.edit)
    .delete(categoryController.remove);

module.exports = router;
