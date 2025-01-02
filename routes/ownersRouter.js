const express = require('express');
const dotenv = require('dotenv').config();
const router = express.Router()
const flash = require('connect-flash');
const expressSession = require('express-session');
const ownerModel = require('../models/owner-model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const isOwner = require('../middlewares/isOwner');
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

module.exports = router