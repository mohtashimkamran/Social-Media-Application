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
    //Todo Later
}

//handle sign in form and create a session for specific user
module.exports.createSession=function(req,res){
    //Todo Later
}
