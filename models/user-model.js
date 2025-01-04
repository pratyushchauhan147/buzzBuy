const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    fullname :{type:String , required:[true,"Fullname Required"]},
    password:{type:String , required:[true,"Password Required"]},
    city:{type:String , required:[true,"city Required"]},
    address:{type:String , required:[true,"address Required"]},
    email :{type:String , required:[true,"Email Required"] , unique:[true,"Email already Used"]},
    cart:[{type:mongoose.Schema.Types.ObjectId, ref:"product"}],
    order:[{type:mongoose.Schema.Types.ObjectId, ref:"order"}],
    contact:{type:String, require:[true,"Contact Require"] , minlength: 10 , maxlength: 12},
    picture:Buffer
})
 module.exports = mongoose.model("user",userSchema)