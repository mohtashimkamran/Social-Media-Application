const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"665040190629-njd8kgjlhfrepvb1f1dugrpnc5p1efsg.apps.googleusercontent.com",
    clientSecret:"3d7YR0usDCtHCw_tvWIYi3WW",
    callbackURL:"http://localhost:8100/users/auth/google/callback"
    },
    //calllback function
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if (err){console.log("error in establishing google-passport-strategy",err);return;}
            console.log(accessToken,refreshToken);
            console.log(profile);
            //if found set this user as req.user
            if (user){
                return done(null,user);
            }
            //if user not found then create a new user and set it as req.user
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                },function(err,user){
                    if (err){console.log('error in creating user by google oauth');return;}
                    return done(null,user)
                })
            }
        })
    }))
module.exports = passport;