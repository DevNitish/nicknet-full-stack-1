const express = require("express");
const router =express.Router();
const path = require('path');
const User = require("../model/user");
router.post("/signup", async (req, res) => {
  //console.log("signup page",req.body);
    var newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    });
    await User.findOne({ name: newUser.name, email: newUser.email })
    .then(async profile => {
      if (!profile) {
        await newUser
          .save()
          .then(() => {
            res.status(200).send(newUser);
          })
          .catch(err => {
            console.log("Error is ", err.message);
          });
      } else {
        res.send("User already exists...");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
});

router.get("/viewusers",function(req,res){
  User.findAllUser(function(err,result){
    if(err){
        res.status(400).send('Users not found!');
    }else{
        res.send(result);
        console.log(result);
    }
    })
});
router.post('/saveUser', function(req, res,next) {

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
 
router.post('/editUser', function(req, res,next) {
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

router.delete('/deleteUser', function(req, res,next) {
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
  