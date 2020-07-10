const express=require('express');
const router =express.Router();
const Query= require("../model/querymodel");

router.post("/sendquery",function(req,res){
    console.log("query: ",req.body);
    Query.sendQuery( req.body,function(err,result){
        if(err){
            res.status(400).send('query not found!');
        }else{
            res.send(result);
            console.log("saved");
        }
    })
});

module.exports = router;