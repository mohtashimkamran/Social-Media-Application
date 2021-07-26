const User = require('../models/user');

module.exports.profile = function(req,res){
    // return res.end('<h1>User Profile</h1>')
    return res.render('profile',{
        title:"Profile"
    });
}

//render the signup page
module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title:"CodeZone | Sign Up"
    })
}

//render the signin page
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title:"CodeZone | Sign In"
    })
}

//get the signed up data
module.exports.create=function(req,res){
    if (req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if (err){
            console.log("Error in finding user");
            return;
        }

        if (!user){
            User.create(req.body,function(err,user){
                if (err){console.log("Error in creating new user while signing up");return};
                
                return res.redirect('/users/sign-in');
            })
        }
    
    else{
        return res.redirect('back');
    }

    });
}

//handle sign in form and create a session for specific user
module.exports.createSession=function(req,res){
    // we use manual authentication by matching entered email and 
    //assword and check if the user exists 
    //and if everything is okay we create a session for that user

    //STEPS to manually authenticate
    //find user
    User.findOne({email:req.body.email},function(err,user){
        if (err){console.log("Error in finding user in sign in");return};
        //handle user found

        if(user){
        // if user found handle password which don't match 
        if (user.password!=req.body.password){
            return res.redirect('back');
        }

        //handle session creation
        res.cookie('user_id',user.id);
        return res.redirect('/users/profile');

        }
        else{
            //handle user not found
            res.redirect('back');
        }

    });
}
