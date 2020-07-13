const express = require("express");
const router =express.Router();
const Course= require("../model/coursemodel");


router.get("/", function(req,res){
    Course.getAllCourses(function(err,result){
      if(err){
          res.status(400).send('courses not found!');
      }else{
        
        res.render('admin' , {data:result})
          console.log(result);
      }
  })
   
  })

  module.exports = router;