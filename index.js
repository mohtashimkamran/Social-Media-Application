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
//passport jwt
const passportJWT = require('./config/passport-jwt-strategy');


const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

//for flash messeges
const flash = require('connect-flash');
//our own middleware for flash messeges
const CustomMiddleware = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true, //make false before production
    outputStyle:"extended",
    prefix:'/css', 
}))

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

//make the upload part available for browser
app.use('/uploads',express.static(__dirname+'/uploads'))


//setting up view engine
app.set('view engine','ejs');
app.set('views',"./views")


//session cookies
//Mongo store is use to store the session  cookie in the db
app.use(session({
    name:'CODEZONE',
    //Change the secret before production 
    secret:"Something",
    saveUninitialized:false,  //whenever there is a req which is not initialised which means the user is not logged in so do I have to save some additional data in the database so No! this is why it is created as False
    resave:false,   // when the identity is established that means when the session cookie is created and do i want to save the data which is not changed ? So NO! that is why it is termed as False.
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/codezone_development',
    },
    {
            mongooseConnection: db,
            autoRemove:'disabled'
    },
    {
        function(err){
            console.log(err || 'connect-mongo setup ok');
        }
    },
    )
}));
app.use(passport.initialize());
app.use(passport.session());

//for flash messeges
app.use(flash());
app.use(CustomMiddleware.setFlash);

app.use(passport.setAuthenticatedUser);

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