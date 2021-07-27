const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8100;
const app = express();

//for database
const db = require('./config/mongoose');

//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());


//handling ejs layouts
const expresslayouts = require('express-ejs-layouts');
app.use(expresslayouts);

//extract static files and assets from subpages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//for static files
app.use(express.static('./assets'));



//setting up view engine
app.set('view engine','ejs');
app.set('views',"./views")


//session cookies
app.use(session({
    name:'CODEZONE',
    //Change the secret before production 
    secret:"Something",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//use express router
//for home page
app.use('/',require('./routes'));

app.listen(port,function(err){
    if (err){
        //console.log("Error in starting server");
        console.log(`Error in starting the server : ${err}`);  //interpolation
    }
    else{
        console.log(`Server is up and running on port : ${port}`)
    }
})