const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/buzzbuy")

const userSchema = mongoose.Schema({
    fullname :{type:String , required:[true,"Fullname Required"]},
   password:{type:String , required:[true,"Fullname Required"]},
    email :{type:String , required:[true,"Fullname Required"] , unique:[true,"Email already Used"]},
    cart:[{type:mongoose.Schema.Types.ObjectId, ref:"product"}],
    order:[{type:mongoose.Schema.Types.ObjectId, ref:"order"}],
    contact:{type:Number, require:[true,"Full name reqiore"]},
    picture:String
})
 module.exports = mongoose.model("user",userSchema)