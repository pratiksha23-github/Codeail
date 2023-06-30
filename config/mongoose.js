const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeail_Development')

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function (){
    console.log('Successfully conected to the db');
})

module.exports=db;