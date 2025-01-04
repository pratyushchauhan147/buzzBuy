const express = require('express');
const dotenv = require('dotenv').config();
const router = express.Router()
const flash = require('connect-flash');
const expressSession = require('express-session');
const ownerModel = require('../models/owner-model');
const orderModel = require('../models/order-model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const isOwner = require('../middlewares/isOwner');
const userModel = require('../models/user-model');
const send_mail = require('../utils/sendmail');
router.get("/",(req,res)=>{
    res.send("hey owner")
})

if(process.env.NODE_ENV === 'development')
    router.post("/create", async(req,res)=>{

        let owner = await ownerModel.find();
        if(owner.length >0)
         {   return  res.status(503).send("you Dont have permissions")}
        else
        {
            let {fullname,email,password} = req.body

            let newown = await ownerModel.create({
                fullname,
                email,
                password
            })
            res.send(newown)
        }
})

router.get("/admin",isOwner,async(req,res)=>{
    let products = await productModel.find()
       let message = req.flash('message')
       let error = req.flash('error')
       res.render("admin",{message:message,error:error,products:products})
})
router.get("/create",isOwner,(req,res)=>{

    let success = req.flash("success")
    let erro = req.flash('error')
    res.render("createproducts",{error:erro,success:success})
})

router.get('/orders',isOwner,async(req,res)=>{

    
    let orders = await orderModel.find().populate('user').populate('products')
    let message = req.flash('message')
    let error = req.flash('error')
    res.render("adminorder",{message:message,error:error,orders})
})





router.post('/orderupdate/:id',isOwner,async(req,res)=>{

    
    let {status,payment} = req.body
    let orders = await orderModel.findOneAndUpdate({_id:req.params.id},{status,payment})
    let message = req.flash('message')
    let error = req.flash('error')
    res.redirect("/owner/orders")
})


router.post('/ordercancel/:id',isOwner,async(req,res)=>{

    
    console.log("hi")
    let mgs = `Your order ID is ${req.params.id} is CANCELLED by the Owner at ${Date.now()}`
    let Ouser = await orderModel.findOne({_id:req.params.id}).populate('user')
    let orders = await orderModel.findOneAndDelete({_id:req.params.id})
    send_mail(Ouser.user.email,"Order Cancelled",mgs)
    let message = req.flash('message',"Order Cancelled")
    let error = req.flash('error')
    res.redirect("/owners/orders")
})




module.exports = router