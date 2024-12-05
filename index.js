//Imports
const express = require('express');
const app = express();
const { connectMongodb } = require('./connection');
require('dotenv').config()
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const logoutRouter = require('./routes/logout');
const addProductRouter = require('./routes/addProduct');
const deleteRouter = require('./routes/delete');
const updateRouter = require('./routes/update');
const settingsRouter = require('./routes/settings');
const path = require('path');
const port = process.env.PORT;
const cookieParser = require('cookie-parser');

//DB connection
connectMongodb(process.env.MONGOURL);

//Middlewares
app.use('/stylesheets', express.static('stylesheets'));
app.set('view engine', 'ejs');
app.set('views','./views');
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/',homeRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/logout',logoutRouter);
app.use('/add-product',addProductRouter);
app.use('/delete',deleteRouter);
app.use('/update',updateRouter);
app.use('/settings',settingsRouter);

app.listen(port,()=>{
    console.log(`Server is Running on PORT: ${port}`);
})