const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const querySchema = new Schema({
    queryUser: String,
    queryuserMail: String,
    queryDesc: String,
    mobileNumber: String
})


querySchema.statics.displayQuery=function (callback) {
    this.find({},function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  })
}

querySchema.statics.sendQuery=function (queryInfo,callback) {
    var newqueryObj ={
        queryUser: queryInfo.queryUser,
        queryuserMail: queryInfo.queryuserMail,
        queryDesc: queryInfo.queryDesc,
        mobileNumber: queryInfo.mobileNumber
    };
    console.log("newqueryObj: ",newqueryObj);
    this.create(newqueryObj,function(err,data){
            if(err){
                callback(err,null);
            }else{
                callback(null,data);
            }
    }) 
  }

  querySchema.statics.deleteQuery=function(queryId, callback)
{		console.log("deleteQuery id",queryId);
	this.findOne({
		_id:queryId
    
	}).remove( ).exec();
	callback(null, 'Deleted');
     
};

const query = mongoose.model('queries', querySchema);
module.exports=query;
  