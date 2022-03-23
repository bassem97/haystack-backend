const express = require('express');
const router = express.Router();
const productRoutes = require('./product');
const categoryRoutes = require('./category');



router.use('/products', productRoutes);
router.use('/category', categoryRoutes);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Hello World');
});

module.exports = router;
