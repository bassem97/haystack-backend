const User = require('../models/product');

exports.list = async (req, res, next) => {
    const users = await User.find();
    await res.json({
        users
    });
};

exports.get = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const user = await User.findById(req.params.id);
        if (!user) {
            await res.json({
                error: "user Not Found"
            });
        }
        else {
            await res.json({
                user: user
            });
        }
    }
};

exports.create = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        await res.json({product: user});
    } catch (error) {
        await res.json({
            error: "CONFLICT !"
        });
    }
};

exports.edit = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.json({
                error: "Id Not Found"
            });
        }
        else {
            const user = new User(req.body);
            const updatedProduct = await User.findByIdAndUpdate(req.params.id, user);
            await res.json({updatedUser});
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
        User.deleteOne(req.params.id);
    } catch (error) {
        console.log(error.message);
        await res.json({
            error: error.message
        });
    }
};
