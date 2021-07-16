const express = require('express');
const port = 8100;

const app = express();

//handling ejs layouts
const expresslayouts = require('express-ejs-layouts');
app.use(expresslayouts);

//use express router
//for home page
app.use('/',require('./routes'));

//setting up view engine
app.set('view engine','ejs');
app.set('views',"./views")

//for users page
// app.use('/users',require('./routes/user'));

app.listen(port,function(err){
    if (err){
        //console.log("Error in starting server");
        console.log(`Error in starting the server : ${err}`);  //interpolation
    }
    else{
        console.log(`Server is up and running on port : ${port}`)
    }
})