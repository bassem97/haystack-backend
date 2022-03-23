

const mongoose = require('mongoose');
const Schema = mongoose.Schema;





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
    });

// //Remove refreshToken from the response
// userSchema.set("toJSON", {
//     transform: function (doc, ret, options) {
//         delete ret.refreshToken
//         return ret
//     },
// })


module.exports = mongoose.model('User', userSchema);
