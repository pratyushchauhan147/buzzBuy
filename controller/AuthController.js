
const userModel = require('../models/user-model');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

module.exports.registerUser =  function(req,res){
    
    try 
    {
        let {fullname,password,email} = req.body

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,result)=>{
                if(err) return res.send(err.message);
                else{
                   
                        let newuser = await userModel.create({fullname,password:result,email})
                       

                         let token = generateToken(newuser)
                         res.cookie("token",token)
                         res.send({newuser,token})

                        
                   
                
                }
            })
        })  
    } 
    catch (error) {res.send(error.message)}

    }


module.exports.loginUser = async (req,res)=>{
    let {email,password} = req.body
   let user =  await userModel.findOne({email:email})
   if(!user) { req.flash("error","User Not Found") 
                res.redirect("/")}
    else
    {
        bcrypt.compare(password,user.password,(err,result)=>{
           let token = generateToken(user)
          res.cookie("token",token)
          req.flash("message","Welcome")
          res.redirect("/shop")
        })
    }

}