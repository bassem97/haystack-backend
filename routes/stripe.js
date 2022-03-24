const router = require("express").Router();
const stripe = require("stripe")("sk_test_51KdlDGLEkrbTJcCq1L3vO6a8Zx95m6VfjaZzb8KZAF2tEQ0LxUlCRhndtLYU0zyTQt4sXIttd7g4fKINow7uT3hK00o4bLvjbp");

router.post("/payment", (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;
