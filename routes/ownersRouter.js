const express = require('express');
const dotenv = require('dotenv').config();
const router = express.Router()
const ownerModel = require('../models/owner-model');
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

module.exports = router