const mongoose = require('mongoose');
const config = require("config");
const dbgr = require('debug')("dev:mongoose");

mongoose.connect(`${config.get("MONGODB_URI1")}/buzzbuy`)
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
})

module.exports =  mongoose.connection