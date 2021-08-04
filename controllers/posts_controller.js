const Post = require('../models/post');

//saving post to database
module.exports.create = function(req,res){
    Post.create({
        content :req.body.content,
        user :req.user._id,
    },function(err,post){
        if (err){console.log("Error in creating new user while signing up");return};
        
        return res.redirect('back');
    })
}