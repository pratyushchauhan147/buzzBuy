const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {type:String, required:[true,"Name required"]},
    desc : String,
    color:String,
    bgcolor:String,
    panelcolor:String,
    textcolor:String,
    price:{type:Number, required:[true,"Price required"]},
    disount:{type:Number,default:0},
    image:Buffer
})
 module.exports = mongoose.model("product",productSchema)