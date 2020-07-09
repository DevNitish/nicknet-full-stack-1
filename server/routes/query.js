const express=require('express');
const router =express.Router();
const Query= require("../model/querymodel");


router.get("/viewqueries",function(req,res){
    Query.displayQuery(function(err,result){
        if(err){
            res.status(400).send('query not found!');
        }else{
            res.send(result);
            console.log(result);
        }
    })
});

module.exports = router;