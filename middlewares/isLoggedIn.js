const jwt= require('jsonwebtoken');
const userModel = require('../models/user-model');
module.exports = async (req,res,next)=>{
    if(!req.cookies.token)
    {
        req.flash("error","You need to login")
        return res.redirect("/loginpage")
       // return res.send("need to login")
    }

    try{
    let decode = jwt.verify(req.cookies.token,process.env.JWT_KEY)
    let user = await userModel.findOne({email:decode.email}).select("-password")
    req.user = user
    
    next()
    }catch(error)
    {
        req.flash("error","something is wrong")
        return res.redirect("/loginpage")
    }
}