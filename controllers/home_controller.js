const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){
    try {
        //populate the users of each posts
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user',
            }
        })
        let users = await User.find({});

        return res.render('home',{
            title : "CodeZone Home",
            posts : posts,
            all_users : users,
        });  
    } catch (error) {
        console.log("Error",error)
    }
}