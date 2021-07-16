const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codezone_development',{ useUnifiedTopology: true , useNewUrlParser: true });

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to mongodb'));

db.once('open',function(err){
    console.log('Connected to Database::MongoDb');
})

module.exports = db;