/* ---------------- CONTAINS ALL ROUTES TO DO WITH STUDENTS-------------*/
//importing important packages that shall be used
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

// importing the model that poas shall use
const Student = require('../models/Student');

//current date
const current_date = new Date();

router.get('/all_students' , async(req,res) => {
   
});

//POST ROUTE TO INSERT STUDENT INTO DATABASE
router.post('/save_student' , async(req,res) => {


    //incoporate session code later

    //generate secondary id (student id)
var student_id , autonumber , current_year ;

current_year = current_date.getFullYear(); //getting the current year

//first , get the most recent autonumber
var most_recent = await Student.findOne().sort({autonumber:-1}).exec();

// console.log(most_recent);

if(most_recent == undefined || most_recent.length == 0){
    //if there is no record, meaning its the first record to be stored

    autonumber = 0;        

}else{
    //if there is a record then get that auto number and year

    if(current_year == ( most_recent.year + 1)){
        //if the current year is one more than the most recent year recorded in the database
        //that means its a new year and so the auto number is reset to 1

        autonumber = 0;

    }else{

        autonumber = most_recent.autonumber;
    }

}
//increment the returned autonumber by 1
autonumber += 1;

if(autonumber < 10){
    student_id = "ST"+current_year.toString().slice(1,4)+"000" +autonumber ;
}else if(autonumber >= 10){
    student_id = "A"+current_year.toString().slice(1,4)+"00" +autonumber ;
}else if(autonumber >= 100){
    student_id = "A"+current_year.toString().slice(1,4)+"0" +autonumber ;
}else if(autonumber >= 1000){
    student_id = "A"+current_year.toString().slice(1,4)+"" +autonumber ;
}

//insert student into database via document (model instance)
var saved_student = new Student({

    student_id : student_id,
    surName : req.body.surName,
    givenName : req.body.givenName,
    email : req.body.email,
    gender : req.body.gender,
    dob: req.body.dob,
    autonumber : autonumber,
    year : current_year,
    status : "active",
    added_on : Date.now()

})

    try {

        await saved_student.save();

        return res.redirect('/all_students');
        
    } catch (error) {

        console.log(error.message)            
            
            return res.render('administrators/register_administrator' , {
    
                title:"REGISTER ADMINISTRATOR",
                account : account,
                error_message : error.message
            });
        
    }
})


module.exports = router;