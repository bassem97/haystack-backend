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
  followers : [{type: Schema.Types.ObjectID, ref: 'User'}],
  products : [{type: Schema.Types.ObjectID, ref: 'Product'}]
});

// //Remove refreshToken from the response
// userSchema.set("toJSON", {
//     transform: function (doc, ret, options) {
//         delete ret.refreshToken
//         return ret
//     },
// })

module.exports = mongoose.model('User', userSchema);