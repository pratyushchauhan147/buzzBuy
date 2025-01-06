const express = require('express');
const router = express.Router()
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');
const flash = require('connect-flash');
const expressSession = require('express-session');
router.get("/",(req,res)=>{
    res.send("hey Product")
})

router.post("/create", upload.single("image"), async(req,res)=>{



   let  {name,color,bgcolor,panelcolor,textcolor,price,discount} = req.body
try{
    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        disount:discount,
        color,
        bgcolor,
        panelcolor,
        textcolor,
    
    })
    let success = req.flash("success","Product Created ")
    res.redirect("/owner/create")
}catch(error)
{
    req.flash("error",error.message)
    res.redirect("/owner/create")
}


})

router.post("/delete/:id",async(req,res)=>{
    let delpro = await productModel.findOneAndDelete({_id:req.params.id})
    req.flash("message","Product Deleted")
    res.redirect("/owner/admin")

})

module.exports = router