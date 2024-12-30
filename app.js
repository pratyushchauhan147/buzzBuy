const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./configs/mongoose-connect');
const ownersRouter = require('./routes/ownersRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');


const app = express();
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.set("view engine","ejs")





app.get('/',(req,res)=>{
    res.send("ghh")
})
app.use("/owner",ownersRouter)
app.use("/user",userRouter)
app.use("/product",productRouter)



app.listen(3000)