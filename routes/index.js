const express = require('express');
const router = express.Router();
const productRoutes = require('./product');
const useRoutes = require('./user');



router.use('/products', productRoutes);
router.use('/user', useRoutes);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Hello World');
});

module.exports = router;
