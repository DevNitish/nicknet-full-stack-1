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

router.delete('/deleteQuery', function(req, res,next) {
    console.log("here deleteQuery",req.body);
  
  Query.deleteQuery(req.body._id, function(err, result) {
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