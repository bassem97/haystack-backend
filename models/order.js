const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
    {
            user:{type: Schema.Types.ObjectID, ref: 'User'},
        product:{type: Schema.Types.ObjectID, ref: 'Product'},
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
