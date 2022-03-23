

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose")


const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    },
})

const userSchema = new Schema(
    {
        firstName: String,
        lastName:String,
        username:String,
        email:String,
        password:String,
        image:String,
        birthdate:Date,
        phone:Number,
        googleId : String,
        refreshToken:  [Session]
    });

//Remove refreshToken from the response
userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

userSchema.plugin(passportLocalMongoose,{usernameField:'email'});

module.exports = mongoose.model('User', userSchema);
