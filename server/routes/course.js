const express=require('express');
const router =express.Router();
const Course= require("../model/coursemodel");



router.get("/admin/admincourse/editcourse",function(req,res){
    Course.updateCourse(function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            res.send(result);
        }
    })
});

router.get("/admin/admincourse/addnewcourse",function(req,res){
    Course.addnewCourse(function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            res.send(result);
        }
    })
});