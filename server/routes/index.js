//API end points
const express=require('express');
const router =express.Router();
const USER= require("../model/user");



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

module.exports = router;