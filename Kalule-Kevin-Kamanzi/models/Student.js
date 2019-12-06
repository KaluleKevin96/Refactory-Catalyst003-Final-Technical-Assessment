//this shall have the code that will interact with the database regarding documents

const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const studentschema = mongoose.Schema({
    studentID:{
        type:String,
        required:[true , "Please Generate Student ID"]
    },
    surName:{
        type:String,
        required:[true , "Please Fill Student Sur Name"]
    },
    givenName:{
        type:Date,
        required:[true , "Please Enter Student Given Name"]
    },
    gender:{
        type:String,
        required:[true , "Please Enter Student Gender"]        
    },
    dob:{
        type:Date,
        required:[true , "Please Enter Student Date of Birth"]
    },
    country:{
        type:String,
        required:[true , "Please Enter Student Country"]
    },
    placeOfResidence:{
        type:String,
        required:[true , "Please Enter Student Place of Residence"]
    },
    email:{
        type:String,
        required:[true , "Please Enter Student Email"]
    },
    skills:{
        type:String,
    },
    projects:{
        type:String,
    },
    
    added_on:{
        type:Date,
        default: Date.now(),
    },
    autonumber:{
        type:Number,
        required : [true , "Autonumber is required"]
    },
    year:{
        type:Number,
        required : [true , "Year is required"]
    },
    status:{
        type: String,
        required : [true , "What is the Student's status"]
    }
});


//exporting the model so that it can be accessed by the different routes
module.exports = mongoose.model('Student',studentschema );