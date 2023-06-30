const express=require('express');
const port= 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db=require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayout);
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    if(err){
        console.log("Error! in running server ",err);
    }
    console.log("Server listening on port ",port);
});