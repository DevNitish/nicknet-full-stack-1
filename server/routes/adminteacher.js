const express=require('express');
const router =express.Router();
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
            res.send(result);
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

module.exports= router;