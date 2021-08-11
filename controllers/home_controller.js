const Post = require('../models/post');

module.exports.home = function(req,res){
    // return res.end("<h1> Express is up for Codezone</h1>")
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title : "CodeZone Home",
    //         posts : posts
    //     });
    // });
    //populate the user for each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user',
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title : "CodeZone Home",
            posts : posts
        });
    })

}