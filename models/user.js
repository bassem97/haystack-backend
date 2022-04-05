

const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const userSchema = new Schema({
    firstName: String,
    lastName:String,
    username:String,
    email:String,
    password:String,
    image:String,
    birthdate:Date,
    phone:Number,
    cover : String,
    image : String,
    bio : String,
    isVerified : Boolean,
    level : {
        Number,
        default: 0
    },
    experience : {
        Number,
        default: 0
    },
    newLevelExperience :{
        Number,
        default: 0
    },
    googleId : String,
    followers : [],
    products : []
});


module.exports = mongoose.model('User', userSchema);
