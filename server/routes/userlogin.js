const express = require("express");
const router =express.Router();
const path = require('path');
const User = require("../model/user");
const { Console } = require("console");


  router.get("/showusers",function(req,res){
    User.findAllUser(function(err,result){
      if(err){
          res.status(400).send('Users not found!');
      }else{
          res.send(result);
          console.log(result);
      }
      })
  });

  router.post('/saveUser1', function(req, res,next) {

    User.saveUser(req.body, function(err, result) {
      if (result) {
              console.log("Inserted");
  
        res.send(result);
          
      } else {
        console.log("Error");
         
        res.status(500).send('Internal error occurred--500');
      }
    });
  });
   
  router.post('/editUser1', function(req, res,next) {
    console.log("here",req.body);
  
  User.editUser(req.body, function(err, result) {
    if (result) {
            console.log("Edited",result);
  
      res.send(result);
        
    } else {
      console.log("Error");
       
      res.status(500).send('Internal error occurred--500');
    }
  });
  });
  
  router.delete('/deleteUser1', function(req, res,next) {
    console.log("here deleteUser",req.body);
  
  User.deleteUser(req.body._id, function(err, result) {
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