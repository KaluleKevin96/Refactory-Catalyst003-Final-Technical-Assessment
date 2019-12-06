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

    var students = await Student.find();
console.log(students);
    res.render('all_students' , {

        title:"ALL STUDENTS",
        students:students
    })
   
});

//POST ROUTE TO INSERT STUDENT INTO DATABASE
router.post('/save_student' , async(req,res) => {


    //incoporate session code later

    //generate secondary id (student id)
var student_id , autonumber , current_year, skills ,projects ;

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
    student_id = "ST"+current_year.toString().slice(1,4)+"00" +autonumber ;
}else if(autonumber >= 100){
    student_id = "ST"+current_year.toString().slice(1,4)+"0" +autonumber ;
}else if(autonumber >= 1000){
    student_id = "ST"+current_year.toString().slice(1,4)+"" +autonumber ;
}

if(req.body.skills == '' || req.body.skills == null || req.body.skills == undefined){

    skills = "None Listed";

}else{

    skills = req.body.skills;
}

if(req.body.projects == '' || req.body.projects == null || req.body.projects == undefined){

    projects = "None Listed";
    
}else{

    projects = req.body.projects;
}
//insert student into database via document (model instance)
var saved_student = new Student({

    studentID : student_id,
    surName : req.body.surName,
    givenName : req.body.givenName,
    email : req.body.email,
    phoneNumber : req.body.phoneNumber,
    gender : req.body.gender,
    dob: req.body.dob,
    country:req.body.country,
    placeOfResidence : req.body.placeOfResidence,
    autonumber : autonumber,
    year : current_year,
    skills : skills,
    projects : projects,
    status : "active",
    added_on : Date.now()

})

    try {

        await saved_student.save();

        // req.session.success_message = req.body.surName + " " + req.body.givenName + " was registered successfully";

        return res.redirect('/students/all_students');
        // return res.send("Student Saved Successfully");

        /* return res.render('all_students' , {
    
            title : "ALL STUDENTS",
            success_message : req.body.surName + " " + req.body.givenName + " was registered successfully"
        }); */
        
    } catch (error) {

        console.log(error.message)            
            
            return res.render('student_data_entry_form' , {
    
                title : "Student Data Entry Form",
                error_message : error.message
            });
        
    }
})


//getting a single user
router.get('/view_student/:id', async (req, res, next) => {

    try{
        //find user with the id
        var student = await Student.findById(req.params.id);

        return res.render('/single_stdent' , {
            title : student.surName + " " + student.givenName + " PROFILE",
            student: student
        });
    }
    catch(err){
// req.flash("error", err);
        return res.send("Failed to submit");
    }
   
  });

module.exports = router;