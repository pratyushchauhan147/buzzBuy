const mongoose = require('mongoose'));

const productSchema = mongoose.Schema({
    name : String,
    desc : String,
    color:String,
    bgcolor:String,
    panelcolor:String,
    textcolor:String,
    price:Number,
    disount:{type:Number,default:0},
    image:String
})
 module.exports = mongoose.model("user",productSchema)