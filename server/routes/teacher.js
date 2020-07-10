const express=require('express');
const router =express.Router();
const bodyParser = require('body-parser');
const Teacher= require("../model/teachermodel");

var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post("/editteacher",urlencodedParser,function(req,res){
    console.log("req body",req.body);
    Teacher.updateTeachers(req.body,function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            res.send(result);
        }
    })
});

module.exports = router;