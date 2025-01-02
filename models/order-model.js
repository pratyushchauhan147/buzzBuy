const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    date:{type:Date , default:Date.now},
    user:{type:mongoose.Schema.Types.ObjectId , ref:'user'},
    products:[{type:mongoose.Schema.Types.ObjectId , ref:'product'}],
    price:{type:Number, required:[true,"Price required"]},
    discount:{type:Number,default:0},
    status:{type:String,default:"ordered"},
    payement:{type:String,default:"unpaid"},

})
 module.exports = mongoose.model("order",orderSchema)