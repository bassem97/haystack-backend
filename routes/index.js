
const router = require('express').Router();
const productRoutes = require('./product');
const authRoutes = require("./auth");
const userRoutes = require("./user");

router.use('/products', productRoutes);
router.use('/user', userRoutes);
router.use("/auth", authRoutes);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Hello World');
});


module.exports = router;
