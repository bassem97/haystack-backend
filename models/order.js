const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema(
    {
            user:{type: Schema.Types.ObjectID, ref: 'User'},
        products: [
            {
                product: {
                    type: String,
                }
            },
        ],
        // products:{ type: Schema.Types.ObjectID, ref: 'Product'},
        //

        amount: { type: Number,  },
        address: { type: Object,  },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
