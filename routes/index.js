const express = require('express');
const router = express.Router();
const productRoutes = require('product');



router.use('/products', productRoutes);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Hello World');
});

module.exports = router;
