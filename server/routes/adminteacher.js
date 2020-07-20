const express=require('express');
const router =express.Router();
const bodyParser = require('body-parser');
const Teacher= require("../model/teachermodel");

router.post("/editteacher",function(req,res){
    Teacher.adminteacherUpdate(req.body,function(err,result){
        if(err){
            res.status(400).send('teacher not found!');
        }else{
            res.send(result);
        }
    })
});

router.get("/getallteachers",function(req,res){
    Teacher.showallTeachers(function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            // res.send(result);
            res.render('test' , {tdata:result})
            console.log(result);
        }
    })
});

router.post("/addnewteacher",function(req,res){
    console.log("teacher ",req.body);
    Teacher.addnewTeachers( req.body,function(err,result){
        if(err){
            res.status(400).send('Teacher not found!');
        }else{
            res.send(result);
            console.log("saved");
        }
    })
});

router.post('/deleteTeacher', function(req, res,next) {
  // console.log("here deleteTeacher",req.params.id);
  console.log("here deleteTeacher",req.body._id);
  
  //Teacher.deleteTeacher(req.params.id, function(err, result)
  Teacher.deleteTeacher(req.body._id, function(err, result){
    if(err){
        res.status(400).send('course not found!');
    }else{
        res.send(result);
        console.log("deleted");
    }
    /*if (result) {
            console.log("Deleted!");
  
      res.send(result);
        
    } else {
      console.log("Error");
       
      res.status(500).send('Internal error occurred--500');
    } */
  });
  });


module.exports= router;