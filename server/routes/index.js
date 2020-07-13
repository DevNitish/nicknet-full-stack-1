//API end points
const express=require('express');
const router =express.Router();
const Course= require("../model/coursemodel");
const USER= require("../model/user");
const path=require("path");



router.get('/', function(req,res){
  res.render('index') 
}) 


router.get("/findalluser",function(req,res){
    USER.findAllUser(function(err,result){
        if(err){
            res.status(400).send('Users not found!');
        }else{
            res.send(result);
        }
    })
});
router.get("/finduser/:id",function(req,res){
    USER.findOneUser(req.params.id,function(err,result){
        if(err){
            res.status(400).send('User not found!');
        }else{
            res.send(result);
        }
    })
});

router.post('/saveUser', function(req, res,next) {

    USER.saveUser(req.body, function(err, result) {
      if (result) {
              console.log("Inserted");
  
        res.send(result);
          
      } else {
        console.log("Error");
         
        res.status(500).send('Internal error occurred--500');
      }
    });
  });

  router.post('/editUser', function(req, res,next) {
    console.log("here",req.body);

  USER.editUser(req.body, function(err, result) {
    if (result) {
            console.log("Edited",result);

      res.send(result);
        
    } else {
      console.log("Error");
       
      res.status(500).send('Internal error occurred--500');
    }
  });
});

router.post('/deleteUser', function(req, res,next) {
    console.log("here deleteUser",req.body);

  USER.deleteUser(req.body._id, function(err, result) {
    if (result) {
            console.log("Deleted!");

      res.send(result);
        
    } else {
      console.log("Error");
       
      res.status(500).send('Internal error occurred--500');
    }
  });
});

module.exports = router;