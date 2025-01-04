const mongoose = require('mongoose');



const ownerSchema = mongoose.Schema({
    fullname : String,
    password : String,
    email: String,

    Product:{type:Array, default:[]},
    contact:Number,
    gstin:Number,
    picture:String
})
 module.exports = mongoose.model("owner",ownerSchema)