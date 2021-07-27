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

module.export = passport;