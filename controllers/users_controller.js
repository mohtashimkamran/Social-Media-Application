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
    if (req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if (err){ console.log("***Multer Error***",err)}

                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    //this is saving the path of the uplopaded file into the avatar feild in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })


        } catch (error) {
            req.flash('error','You cannot delete this post')
            return res.redirect('back')
            
        }
    }
    else{
        req.flash('error','Unauthorised')
        return res.status(401).isAuthenticated('Unauthorized');
    
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
    req.flash('success','Logged in Successfully');
    return res.redirect('/')
}

module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Logged out');

    return res.redirect('/')
}

