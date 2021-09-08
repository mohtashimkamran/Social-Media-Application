const User = require('../../../models/user');
const jwt = require('jsonwebtoken')

module.exports.createSession = async function(req,res){
    
    try {
    let user = await User.findOne({email : req.body.email});
    
    if (!user || user.password != req.body.password){
        return res.json(422,{
            message:"Invalid Username/Password"
        });
    }
    return res.json(200,{
        message:"Signin successfull, here is your token, please keep it safe",
        data:{
            token: jwt.sign(user.toJSON(),'CodeZone',{expiresIn:'100000'})
        }
    })    


    } catch (err) {
        console.log('error',err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
}