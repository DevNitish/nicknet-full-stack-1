const express=require('express');
const router =express.Router();
const bodyParser = require('body-parser');
const Course= require("../model/coursemodel");



var urlencodedParser = bodyParser.urlencoded({ extended: false })

//edit is same as 'create' but it needs an identifier key i.e. _id to search the object
router.post("/editcourse", urlencodedParser,function(req,res){
    Course.updateCourses(req.body,function(err,result){
        if(err){
            res.status(400).send('Course not found!');
        }else{
            res.send(result);
        }
    })
});

router.get("/viewcourse", urlencodedParser,function(req,res){
    Course.getAllCourses(function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            res.send(result);
            console.log(result);
        }
    })
});

router.post("/addnewcourse", urlencodedParser,function(req,res){
    console.log("addnewcourse-->Course: ",req.body);
    Course.addnewCourses( req.body,function(err,result){
        if(err){
            res.status(400).send('Course not found!');
        }else{
            res.send(result);
            console.log("saved");
        }
    })
});
router.get("/getallcourse",function(req,res){
    Course.getAllCourses(function(err,result){
        if(err){
            res.status(400).send('Course not found!');
        }else{
            res.send(result);
            console.log("Found all!");
        }
    })
});
router.post("/deletecourse", urlencodedParser,function(req,res){
    console.log("-id ",req.body._id)
    Course.deleteCourse(req.body._id,function(err,result){
        if(err){
            res.status(400).send('Course not found!');
        }else{
            res.send(result);
            console.log("Course deleted!", result);
        }
    })
});

module.exports = router;