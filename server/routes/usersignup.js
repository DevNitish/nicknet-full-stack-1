const express = require("express");
const router =express.Router();
const path = require('path');
const User = require("../model/user");


router.get("/", function(req,res){
  res.render('signup.ejs');
})


router.post("/checkuser",function(req,res){
  User.findOne({email:req.body.email }).then(function(result){
    if(result == null){
        res.send(console.log('saved'))
    } else {
        res.status(404).end();
    }
});

})


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
  