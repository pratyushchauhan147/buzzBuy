const express = require('express');
const router = express.Router()
const {registerUser,loginUser} = require('../controller/AuthController');

const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');
const orderModel = require('../models/order-model');

router.get("/",(req,res)=>{s
    res.send("hey User")
})

router.post("/register",registerUser)


router.post("/login",loginUser)
router.get("/logout",(req,res)=>{
    res.clearCookie("token")
    req.flash("error","You Are Logged Out")
    res.redirect("/")
})

router.get('/cart',isLoggedIn,async(req,res)=>{

    let user = await userModel.findOne({email:req.user.email}).populate("cart")
    let message = req.flash('message')
    let error = req.flash('error')
    let nettotal = 0
    let totaldiscount =0;
    console.log(user.cart.length)
    user.cart.forEach(pro => {
      pro.total =pro.price+ 20 - pro.disount
      totaldiscount +=pro.disount
      nettotal += pro.total 
        
    });
    res.render("cart",{message:message,error:error,user:user,nettotal,totaldiscount})
})



router.post("/cart/delete/:id",isLoggedIn,async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    let itemid = req.params.id
    let cartitem = user.cart.findIndex( item=>item._id.toString() === itemid)

    if(cartitem >-1)
    {
        user.cart.splice(cartitem, 1); 
        await user.save();
        req.flash('message', 'Item removed from cart.')
    }
    else{
        req.flash('error', 'Item not found in cart.');
    }
    res.redirect("/users/cart")
    

})



router.post('/cart/order',isLoggedIn,async(req,res)=>{

    let user = await userModel.findOne({email:req.user.email}).populate("cart")
    let message = req.flash('message')
    let error = req.flash('error')

    console.log(user.cart.length)
    
    user.cart.forEach(pro => {
      pro.total =pro.price+ 20 - pro.disount
      totaldiscount +=pro.disount
      nettotal += pro.total 
        
    });

    let order = orderModel.create({})

    res.render("cart",{message:message,error:error,user:user,nettotal,totaldiscount})
})




module.exports = router