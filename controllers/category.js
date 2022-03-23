const Category = require('../models/category');

exports.list = async (req, res, next) => {
    const categories = await Category.find();
    await res.json({
        categories
    });
};

exports.get = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const category = await Category.findById(req.params.id);
        if (!category) {
            await res.json({
                error: "category Not Found"
            });
        }
        else {
            await res.json({
                category
            });
        }
    }
};

exports.create = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        await res.json({category});
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
            const category = new Category(req.body);
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category);
            await res.json({updatedCategory});
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
        Category.deleteOne(req.params.id);
        await res.status(200).json("Category deleted");
    } catch (error) {
        console.log(error.message);
        await res.json({
            error: error.message
        });
    }
};
