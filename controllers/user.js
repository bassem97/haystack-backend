const User = require('../models/user');
const bcrypt = require('bcryptjs');
const validator = require("validator");
const jwt = require("jsonwebtoken");


exports.getUsers = async (req, res, next) => {
    console.log(req);
    if (!req.isAuth) {
        await res.json({
            error: "Not Auth"
        });
    }else{
        const users = await User.find();
        await res.json({
            users
        });
    }

};

exports.getUser = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.json({
                error: "user Not Found"
            });
        }
        else {
            res.json({
                user
            });
        }
    }
};
exports.updateUser = async (req, res, next) => {
    let user = await User.findById(req.body._id).exec()
    if (!user) {
        await res.status(404).json({
            error: "user not found"
        });
    }
    else {
        let updatedUser = {...user.toObject(), ...req.body}

        if(updatedUser.password != ''){
            if(await bcrypt.compare(req.body.password, user.password)){
                updatedUser.password = await bcrypt.hash(updatedUser.newPassword, 12);
                delete updatedUser['newPassword']
            }
            else
                return res.status(403).json({error: "wrong password"})
        }
        else{
            delete updatedUser['password']
            delete updatedUser['newPassword']
        }
        await User.findByIdAndUpdate(updatedUser._id, updatedUser).exec()
        res.json({message: 'Your profile is updated successfully!'})
    }
};

exports.deleteUser = async (req, res, next) => {
    if (!req.params.id) {
        await res.json({
            error: "Id Not Found"
        });
    }
    else {
        const user = await User.findById(req.params.id);
        if (!user) {
            await res.json({
                error: "User Not Found"
            });
        } else {
            user.remove();

            await res.json({
                message: "user Removed"
            });
        }
    }
};
exports.login = async (req, res, next) => {
    if (!validator.isEmail(req.body.email.trim().toLowerCase())) {
        res.json({
            error: "Email not valid"
        })
    }
    const user = await User.findOne({email: req.body.email.trim().toLowerCase()});
    if (!user) {
        await res.json({
            error: "Cannot find user"
        })
    }else {
        if (!user.isVerified) {
            await res.json({
                error: "Please check your email to verify your account !"
            })
        } else {
            const isEqual = await bcrypt.compare(req.body.password, user.password);
            if (!isEqual) {
                await res.json({
                    error: "Password Incorrect"
                })
            } else {
                const token = await jwt.sign(
                    {
                        userId: user._id.toString(),
                        email: user.email
                    },
                    'haystack',
                );

                await res.json({
                    token: token,
                    user: user,
                    role: 'User'
                });
            }
        }

    }
};
exports.createUser = async (req, res, next) => {
    if (!validator.isEmail(req.body.email.trim().toLowerCase())) {
        res.json({
            error: "Email not valid"
        })
    }else{
        let  user = await User.findOne({email:req.body.email.trim().toLowerCase()})
        if (user) {
            res.json({
                error: "User already exists !"
            })
        }else{
            user = new User(req.body);
            user.level = 0
            user.experience = 0
            user.newLevelExperience = 0
            user.email = req.body.email.trim().toLowerCase();
            user.password = await bcrypt.hash(req.body.password, 12);
            user.isVerified = false;
            await user.save()
                .then(user => {
                    res.json({
                        message: 'User created successfully!',
                        _id : user._id
                    });
                })

        }

    }
};

exports.changePassword = async (req, res) => {
    if (!req.params.id) {
        await res.json({
            error: "Id Not Found !!"
        });
    }else{
        const user = await User.findById(req.params.id);
        if(!user){
            await res.json({
                error: "User Not Found !!"
            });
        }else{
            const password = await bcrypt.hash(req.body.password, 12);
            try {
                await User.updateOne(
                    {_id:user._id},
                    {$set:{password : password}}
                )
                res.end("Password modified successfully!");
            }catch (e) {
                res.end(e);
            }

        }
    }



}




