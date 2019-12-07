const router = require("express").Router();
const Students = require("../models/schema");

router.post("/", async (req, res) => {
  //   const students = await Students.find();
  try {
    const newStudent = new Students(req.body);
    await newStudent.save();
      console.log("student saved");
    res.send("<h1>New student created Successfully</h1><a href='/'>Back to form</a>");
  } catch (error) {
    res.send("An Error occured");
  }
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
