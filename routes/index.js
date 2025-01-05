const express = require('express');
const router = express.Router()
const {registerUser,loginUser} = require('../controller/AuthController');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const orderModel = require('../models/order-model');
router.get('/',isLoggedIn,(req,res)=>{
    let message = req.flash('message')
    let error = req.flash('error')
    res.redirect("/shop")
})
router.get('/shop', isLoggedIn, async (req, res) => {
    let sortBy = req.query.sortby || 'price'; // Default sorting by price
    let discounted = req.query.discounted === 'true'; // Check if only discounted products should be shown

    let sortOptions = {};
    sortOptions[sortBy] = sortBy=== 'disount'? -1:1 ; 

    let query = discounted ? { disount: { $gt: 0 } } : {};
    let products = await productModel.find(query).sort(sortOptions);
    
   
    let message = req.flash('message');
    let error = req.flash('error');

    // Pass sortBy and discounted to the template
    res.render("shop", { message: message, error: error, products: products, sortBy: sortBy, discounted: discounted });
});


router.get('/loginpage',async(req,res)=>{

    let message = req.flash('message')
    let error = req.flash('error')
    res.render("loginpage",{message:message,error:error,loggedin:false})
})
router.get('/signuppage',async(req,res)=>{

    let message = req.flash('message')
    let error = req.flash('error')
    res.render("signup",{message:message,error:error,loggedin:false})
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

router.get('/order/:id',isLoggedIn,async(req,res)=>{

    
    let order = await orderModel.findOne({_id:req.params.id}).populate('user').populate('products')
    let message = req.flash('message')
    let error = req.flash('error')
    res.render("vieworder",{message:message,error:error,order})
})

router.get('/account',isLoggedIn,async(req,res)=>{

    let user = await userModel.findOne({email:req.user.email})
    let message = req.flash('message')
    let error = req.flash('error')
    res.render("account",{message:message,error:error,user:user})
})


module.exports = router