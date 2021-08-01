const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport 
passport.use(new LocalStrategy({
    usernameField:"email" //this is a field which needs to be unique and we are telling passport to check a particular user on the basis of email
    },
    function(email,password,done){
        //find a user and establsih an identity
        User.findOne({email:email},function(err,user){
            if (err){
                console.log("Error in finding user-->Passport");
                return done(err);
            }
            if (!user || user.password != password){
                console.log("Invalid username or Password");
                return done(null,false);
            }
            return done(null,user);
        });
    }
));
//MANUAL AUTH
//sertialize user function
//in manual auth we are putting userid as cookie and that inf


//deserialize user function
//when the cookie is sent back into the database we  check users on the basis of that data


//PASSPORT JS
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//deserialize the user from the key in cookies and finding users from database

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if (err){
            console.log("Error in finding user-->Passport");
            return done(null,false);
        }
        return done(null,user);
    })
})

//check if the user is authenticated

passport.checkAuthentication = function(req,res,next){
    //if the user is signed in pass on the request to the next function (controller's function)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the seeion cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}

module.export = passport;