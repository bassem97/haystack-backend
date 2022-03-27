const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        stock:{
            type: Number,
            default: 1
        },
        price:{
            type: Number,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        optional_images: [
            {
                type: String,
                validate: {
                    validator: function (v, x, z) {
                        return !(this.optional_images.length > 3);
                    },
                }
            }
        ],
        size: { type: String },
        color: { type: String },

        categories: [
            {type: Schema.Types.ObjectID, ref: 'Category'}
        ],

        owner: {type: Schema.Types.ObjectID, ref: 'User'},
    },
    {timestamps: true}
);
module.exports = mongoose.model('Product', productSchema);
