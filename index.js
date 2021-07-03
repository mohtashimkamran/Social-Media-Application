const express = require('express');
const port = 8000;


const app = express();

//use express router
//for home page
app.use('/',require('./routes'));


app.listen(port,function(err){
    if (err){
        //console.log("Error in starting server");
        console.log(`Error in starting the server : ${err}`);  //interpolation
    }
    else{
        console.log(`Server is up and running on port : ${port}`)
    }
})