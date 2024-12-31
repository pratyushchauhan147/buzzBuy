const express = require('express');
const router = express.Router()

router.get("/",(req,res)=>{
    res.send("hey Product")
})
router.post("/create",(req,res)=>{
    res.send("ok done created")
})

module.exports = router