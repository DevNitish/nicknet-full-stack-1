const express = require("express");
const router = express.Router();
const Course = require("../model/coursemodel");
const Teacher = require("../model/teachermodel");
const Query = require("../model/querymodel");

router.get("/", function (req, res) {
  let data = {
    courses: null,
    teachers: null,
    queries: null
  }

  Course.getAllCourses(function (err, result) {
    if (err) {
      res.status(400).send('courses not found!');
    } else {
        data.courses=result
        //call teachers
        Teacher.showallTeachers(function (err, result) {
          if (err) {
            res.status(400).send('courses not found!');
          } else {
              data.teachers=result
              //call queries
              Query.displayQuery(function (err, result) {
                if (err) {
                  res.status(400).send('courses not found!');
                } else {
                    data.queries=result
                    res.render("admin",{data:data})
                }
              })
          }
        })
    }
  })

})

module.exports = router;