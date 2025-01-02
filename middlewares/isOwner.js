const jwt= require('jsonwebtoken');
const userModel = require('../models/user-model');
const ownerModel = require('../models/owner-model');
module.exports = async (req,res,next)=>{
    if(!req.cookies.token)
    {
        req.flash("error","you need to login")
        return res.redirect("/")
       // return res.send("need to login")
    }

    try{
    let decode = jwt.verify(req.cookies.token,process.env.JWT_KEY)
    let user = await ownerModel.findOne({email:decode.email}).select("-password")
    if(!user)
    {
        req.flash("error","Permission denied")
        return res.redirect("/shop")
    }
    req.user = user
    
    next()
    }catch(error)
    {
        req.flash("error","something is wrong")
        return res.redirect("/")
    }
}