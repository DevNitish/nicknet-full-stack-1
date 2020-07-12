const express=require('express');
const router =express.Router();
const Course= require("../model/coursemodel");


router.get('/', function(req,res){
    Course.getAllCourses(function(err,result){
      if(err){
          res.status(400).send('courses not found!');
      }else{
        
        res.render('courses' , {data:result})
         // res.send(result);
          console.log(result);
      }
  })
    
  })


router.get("/viewcourse",function(req,res){
    Course.getAllCourses(function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            res.send(result);
            console.log(result);
        }
    })
});

module.exports = router;