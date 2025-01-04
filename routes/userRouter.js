const express = require('express');
const router = express.Router()
const {registerUser,loginUser} = require('../controller/AuthController');
const upload = require('../config/multer-config');
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');
const orderModel = require('../models/order-model');
const send_mail = require('../utils/sendmail');



router.get("/",(req,res)=>{
    res.send("hey User")
})

//Register
router.post("/register",registerUser)

//login
router.post("/login",loginUser)

router.post("/updateuser", upload.single("profilePic"), isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        let {fullname,contact,address,city} = req.body
        if(isNaN(contact))
        {
            req.flash("error", "Enter Valid Information")
             return res.redirect("/account");
        }
        user.fullname = fullname;
        user.contact = contact;
        user.address = address;
        user.city = city
        if (req.file && req.file.buffer) {
            user.picture =req.file.buffer 
        }
        await user.save()
      
        req.flash("message","Profile Updated ")
    } catch (error) {
        req.flash("error", error.message);
        console.log(error);}
        res.redirect("/account");
});





router.get("/logout",(req,res)=>{
    res.clearCookie("token")
    req.flash("error","You Are Logged Out")
    res.redirect("/")
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//                                                     CART ROUTES FOR USER
//
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Get Cart Items
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


//Delete Cart Item
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

//Place order 
router.post('/cart/order',isLoggedIn,async(req,res)=>{ 
    let message = req.flash('message')
    let error = req.flash('error')
    let nettotal = 0
    let totaldiscount =0;
    let user = await userModel.findOne({email:req.user.email}).populate("cart")
    
    console.log(user.cart.length)
    if(user.cart.length ===0)
    {  req.flash("error","Nothing in Cart")
       return res.redirect("/shop")
     }
    try{
       
    user.cart.forEach(pro => {
      pro.total =pro.price+ 20 - pro.disount
      totaldiscount +=pro.disount
      nettotal += pro.total 
        
    });

    let order = await orderModel.create({
        user:req.user._id,
        products:user.cart,
        price:nettotal,
        discount:totaldiscount,
        itemcount:user.cart.length
    })
    let items =[]
    user.cart.forEach(item => {
        items.push(item.name)
        
    });
    let mgs = `Your order ID is ${order._id} \n items list : ${items.toString()}  \n Placed at ${order.date}`
    user.cart =[]
    
    user.order.push(order)
       
    await user.save()

    send_mail(user.email,"Your Order is Placed !",mgs)
    req.flash("message","Order Successfull, Mail Sent")
}catch(error)
{
    req.flash("error",error.message)
}
    res.redirect("/orders")
})





module.exports = router