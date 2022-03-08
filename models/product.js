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
            required: true
        },
        price:{
            type:String,
            required: true
        },
        description:{
            type:String,
            required: true
        },
        image:{
            type:String,
            required: true
        },
        optional_images: [
            {
                type: String,
            },
        ],
        category: {type: Schema.Types.ObjectID, ref: 'Category'},
        owner: {type: Schema.Types.ObjectID, ref: 'User'},
    },
    {timestamps: true}
);
module.exports = mongoose.model('Product', productSchema);
