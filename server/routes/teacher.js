const express=require('express');
const router =express.Router();
const Teacher= require("../model/teachermodel");



router.get("/admin/adminteacher/editteacher",function(req,res){
    Course.updateTeacher(function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            res.send(result);
        }
    })
});

router.get("/admin/admincourse/addnewteacher",function(req,res){
    Course.addnewTeacher(function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            res.send(result);
        }
    })
});