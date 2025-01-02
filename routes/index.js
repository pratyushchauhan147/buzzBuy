const express = require('express');
const router = express.Router()
const {registerUser,loginUser} = require('../controller/AuthController');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const orderModel = require('../models/order-model');
router.get('/',(req,res)=>{
    let message = req.flash('message')
    let error = req.flash('error')
    res.render("index",{message:message,error:error,loggedin:false})
})
router.get('/shop',isLoggedIn,async(req,res)=>{

    let products = await productModel.find()
    let message = req.flash('message')
    let error = req.flash('error')
    res.render("shop",{message:message,error:error,products:products})
})





router.get('/addtocart/:id',isLoggedIn,async(req,res)=>{

        let user = await userModel.findOne({email:req.user.email})
         user.cart.push(req.params.id)
         await user.save();
         req.flash("message","Added To Cart");
         res.redirect("/shop")


})


//Order Page
router.get('/orders',isLoggedIn,async(req,res)=>{

    let user = await userModel.findOne({email:req.user.email}).populate("order")
    let message = req.flash('message')
    let error = req.flash('error')
    res.render("orders",{message:message,error:error,user:user})
})

module.exports = router