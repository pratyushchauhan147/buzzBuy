const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');


//const db = require('./config/mongoose-connect');
const db = require('./config/mongoose-atlas-connect');
const ownersRouter = require('./routes/ownersRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const indexR = require('./routes/index');
const isLoggedIn = require('./middlewares/isLoggedIn');
const productModel = require('./models/product-model');


const app = express();
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_KEY
}))
app.use(flash())
app.set("view engine","ejs")




app.use(indexR)


app.use("/owner",ownersRouter)
app.use("/users",userRouter)
app.use("/products",productRouter)



app.listen(3000)