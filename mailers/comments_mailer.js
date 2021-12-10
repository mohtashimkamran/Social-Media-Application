const nodemailer = require('../config/nodemailer');

//another way of exporting
module.exports.newComment = (comment) => {
    nodemailer.transporter.sendMail({
        from:'codezone95@gmail.com',
        to: comment.user.email,
        subject: "New Comment",
        html: "<h1>Your comment has been published</h1>"
    },(err,info)=>{
        if (err){console.log("error in sending mail",err);return;}

        console.log("Message sent/Deliverd",info);
        return;
    })
}