const express = require("express");
const router =express.Router();
const path = require('path');
const User = require("../model/user");
const { Console } = require("console");




router.get("/",function(req,res){
  res.render('login');
})

router.post('/checklogin',function(req,res){
  req.body;
    var mail = req.body.email ;
    var pass = req.body.password;
    console.log(mail);
    console.log(pass);
    User.findOne({email:req.body.email }).then(function(result){
          if(result === null){
              res.status(404).end();
          }else if(result.email === mail && result.password === pass){
                 var adminmail = "mail@gmail.com";
                 var adminpass = "12344";
                if(result.email === adminmail && result.password === adminpass ){
                  res.redirect('/admin')
                  console.log("admin welcome");
                } 
                else{
                  res.send(console.log("welcome"));
                }
          } else {
              res.status(404).end();
          }
      }); 
  }); 




 /* router.post("/login", async (req, res) => {
    var newUser = {};
    newUser.name = req.body.name;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
  
    await User.findOne({ name: newUser.name, email:newUser.email})
      .then(profile => {
        if (!profile) {
          res.send("User not exist");
        } else {
          if (profile.password == newUser.password) {
            res.send("User authenticated");
            res.render('admin') 
          } else {
            res.send("User Unauthorized Access");
          }
        }
      })
      .catch(err => {
        console.log("Error is ", err.message);
      });
  }); */

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