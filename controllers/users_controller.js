const User = require('../models/user');

module.exports.profile = async function(req,res){
    try {
        let user = await User.findById(req.params.id);

        return res.render('profile',{
            title:"Profile",
            profile_user : user,
        })
    } catch (error) {
        console.log("Error",error);
    }
}
module.exports.update = async function(req,res){
    try {
        if (req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.params.id,req.body);
            
            return res.redirect('back');
        }
        else{
            return res.status(401).isAuthenticated('Unauthorized');
        }
    } catch (error) {
        console.log("Error",error);
    }
}


//render the signup page
module.exports.signup = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up',{
        title:"CodeZone | Sign Up"
    })
}

//render the signin page
module.exports.signin = function(req,res){
    if (req.isAuthenticated()){
       return  res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title:"CodeZone | Sign In"
    })
}

//get the signed up data
module.exports.create=async function(req,res){
    try {
        if (req.body.password!=req.body.confirm_password){
            return res.redirect('back');
        }
        let user = await User.findOne({email:req.body.email});
    
        if (!user){
            await User.create(req.body,function(err,user){
                if (err){console.log("Error in creating new user while signing up");return};
                
                return res.redirect('/users/sign-in');
            })
        }
        
        else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error",error);
    }
}

//handle sign in form and create a session for specific user
module.exports.createSession=function(req,res){
    return res.redirect('/')
}

module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/')
}

