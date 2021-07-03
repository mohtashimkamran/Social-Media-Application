const express = require('express');
const port = 8000;


const app = express();


app.listen(port,function(err){
    if (err){
        //console.log("Error in starting server");
        console.log(`Error in starting the server : ${err}`);  //interpolation
    }
    else{
        console.log(`Server is running on port : ${port}`)
    }
})