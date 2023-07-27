const express=require('express');
const path=require('path');
const port= 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db=require('./config/mongoose');
const session=require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
  src:'./assets/scss',
  dest:'./assets/css',
  debug: true,
  outputStyle:'extended',
  prefix:'/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayout);

app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: 'codeail',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
        {
        mongoUrl:'mongodb://localhost/codeail_Development',
        autoRemove: 'disabled',
        },
         function(err){
            console.log(err ||"connect mongodb setup ok");
        }
    )
  }));
  
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err){
        console.log("Error! in running server ",err);
    }
    console.log("Server listening on port ",port);
});