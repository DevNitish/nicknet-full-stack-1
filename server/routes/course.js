const express=require('express');
const router =express.Router();
const bodyParser = require('body-parser');
const Course= require("../model/coursemodel");



var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post("/editcourse",function(req,res){
    Course.updateCourses(function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            res.send(result);
        }
    })
});

router.post("/addnewcourse", urlencodedParser,function(req,res){
    var obj = new Course({
        coursename: req.body.coursename,
        coursedesc: req.body.coursedesc,
        courseprice: req.body.courseprice,
        courseduration: req.body.courseduration
    });
    Course.addnewCourses(obj,function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            res.send(result);
            console.log("saved");
        }
    })
});

module.exports = router;