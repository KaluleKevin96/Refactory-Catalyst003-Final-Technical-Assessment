var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  givenName: String,
  surName: String,
  DOB: Date,
  email: String,
  gender: String,
  residence: String,
  projects: String,
  skills: String,
  phone: String
});

const studentModel = mongoose.model("Student", studentSchema);
module.exports = studentModel;
