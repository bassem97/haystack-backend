const User = require('../models/user');
const {getToken, COOKIE_OPTIONS, getRefreshToken} = require("../middlewares/authenticate")
const express = require("express");
const bodyParser = require("body-parser");

const app = express();


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
    } else {
        const user = await User.findById(req.params.id);
        if (!user) {
            await res.json({
                error: "user Not Found"
            });
        } else {
            await res.json({
                user: user
            });
        }
    }
};

exports.create = async (req, res) => {
    try {
        console.log(req)
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
        } else {
            const user = new User(req.body);
            const updatedUser = await User.findByIdAndUpdate(req.params.id, user);
            await res.json({updatedUser});
        }
    } catch (error) {
        console.log(error.message);
        await res.json({
            error: error.message
        });
    }
};

exports.remove = async (req, res, next) => {
    try {
        User.deleteOne(req.params.id);
    } catch (error) {
        console.log(error.message);
        await res.json({
            error: error.message
        });
    }
};

exports.signUp = async (req, res, next) => {
    // Verify that first name is not empty
    console.log(req)
    // if (!req.body.firstName) {
    //     res.statusCode = 500
    //     res.send({
    //         name: "FirstNameError",
    //         message: "The first name is required",
    //     })
    // } else {

    User.register(
        new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName || "",
            lastName: req.body.lastName || "",
        }),
        req.body.password,
        (err, user) => {
            if (err) {
                res.statusCode = 500
                res.send(err)
            } else {
                user.firstName = req.body.firstName
                user.lastName = req.body.lastName || ""
                const token = getToken({_id: user._id})
                const refreshToken = getRefreshToken({_id: user._id})
                user.refreshToken.push({refreshToken})
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500
                        res.send(err)
                    } else {
                        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                        res.send({success: true, token})
                    }
                })
            }
        }
    )
}


