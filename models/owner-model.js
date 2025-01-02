const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/buzzbuy")

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