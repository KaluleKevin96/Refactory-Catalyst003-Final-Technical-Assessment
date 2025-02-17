// console.log("Hello World");/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); //requiring the body parse package (module)

const session = require('express-session'); //importing express session package

const back = require('express-back'); //express back module 
const multer = require('multer');

const passport = require('passport'); //importing passport
const LocalStrategy = require('passport-local').Strategy;

// var cons = require('consolidate'); //importing module to help set html as default view engine

//initialising the app
const app = express();
//requiring the mongoose package to communicate with mondoDB
const mongoose = require('mongoose');


//MIDDLEWARES
//defining what the app should use for the body parser
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());

//declaring the path where the views shall be stored
app.set('views', path.join(__dirname, 'views'));

//defining the view enegine to be pug
app.set('view engine', 'pug');


// view engine setup
/* app.engine('html', cons.swig)
app.set('view engine', 'html'); */



//defining the 'public' folder to be static
app.use(express.static(path.join(__dirname, 'public')));
 
//middleware to tell the application to use session
app.use(session({
    secret : "super secret",
    resave : true,
    saveUninitialized : false
}))

//app using passport and initialzing it
app.use(passport.initialize());
app.use(passport.session());

app.use(back());


// importing the model with student schema
const Student = require('./models/Student');



//middleware to assign session object to locals of the app
app.use((req , res , next) => {

   if(req.session.user){

        app.locals.loggedin_user = req.session.user;
    
    }
    else if(req.user){

        app.locals.loggedin_admin = req.user;
    
    }else if(req.session.poa){

        app.locals.loggedin_poa = req.session.poa;
    }

     next();
 })

//connect to databese
mongoose.connect('mongodb://localhost:27017/refactory', { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false }, () => {
    console.log("Connected to Student database");
});


//IMPORTING  EXTERNAL ROUTES 
//IMPORTING ROUTES 
const studentRoutes = require('./routes/studentRoutes');


//using the imported Documents Route
app.use('/students', studentRoutes);

/* ------------------------- END OF MIDDLEWARE ----------------------------------------------------*/

const current_date = new Date(); //current server date

//ROUTES
/*------------------------------------------------------------------------------------------------------------------------------*/
app.get('/' , (req,res) => {

    res.render('student_data_entry_form' , {

        title : "Student Data Entry Form"
    })
})

//error page handling for non existent paths
app.get('*', (req, res) => {

    res.send("Page Not Found");
    //<h1> ERROR!! ERROR!! <br/><br/> This Page Does Not Exist </h1>
})


//SERVER LISTEN
//telling the server to listen on port 3000
app.listen(3000, function() {

    console.log("Listening on port 3000")
});