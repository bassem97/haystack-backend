const router = require('express').Router();
const productRoutes = require('./product');
const authRoutes = require("./auth");
const userRoutes = require("./user");
const categoryRoutes = require('./category');
const stripeRoutes = require("./stripe");
const orderRoutes = require("./order");

router.use('/products', productRoutes);
router.use('/user', userRoutes);
router.use("/auth", authRoutes);
router.use("/checkout", stripeRoutes);
router.use("/orders", orderRoutes);

router.use('/category', categoryRoutes);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Hello World');
});

module.exports = router;
