const Product = require('../models/product');
const User = require('../models/user');

exports.list = async (req, res, next) => {
    const products = await Product.find();
    await res.json({
        products
    });
};

exports.get = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const product = await Product.findById(req.params.id);
        if (!product) {
            await res.json({
                error: "product Not Found"
            });
        }
        else {
            await res.json({
                product
            });
        }
    }
};

exports.getMyProducts = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
        const user = await User.findById(req.userId);
        if (!user) {
            res.json({
                error: "User Not Found"
            });
        } else {
            const products = await Product.find({owner: user._id.toString()});
            await res.json({
                products
            });
        }
    }
};

exports.create = async (req, res) => {
   /* if (!req.isAuth) {
        await res.json({
            error: "Not Auth"
        });
    }
    else {*/
        try {
            const product = new Product(req.body);
            console.log(product)
            //product.owner = req.userId;
            await product.save();
            await res.json({product});
        } catch (error) {
            console.log(error.message);
            await res.json({
                error: error.message
            });
        }
    //}
};

exports.edit = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.json({
                error: "Id Not Found"
            });
        }
        else {
            const product = new Product(req.body);
            product._id = req.params.id;
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product);
            await res.json({updatedProduct});
        }
    } catch (error) {
        console.log(error.message);
        await res.json({
            error: error.message
        });
    }
};

exports.remove = async (req, res, next) =>  {
    try {
        Product.deleteOne(req.params.id);
        await res.status(200).json("Product deleted");
    } catch (error) {
        console.log(error.message);
        await res.json({
            error: error.message
        });
    }
};
