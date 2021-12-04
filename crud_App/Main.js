const express=require('express');
const app=express();

const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const path =require('path');

// Import mongodb-connection folder.
const connectDB=require('./server/database/connection')


dotenv.config({path:'config.env'})
const PORT=process.env.PORT||5000

// log request allow morgan module.
// say in cmd file loading time on browser.
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// pass request to body parser.
app.use(bodyParser.urlencoded({extended:true}));

// Set View engine.
app.set('view engine','ejs');
// app.set('views',path.resolve(__dirname,"./views/index"))

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));


// Import router file
app.use('/',require('./server/routes/router'))
app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});





