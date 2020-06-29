const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    createdOn: {
        type: Date,
        default: new Date()
    }
})

userSchema.statics.findAllUser=function(callback){
    this.find({

    },function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
    })
}
userSchema.statics.findOneUser=function(userId,callback){
    this.findOne({
        _id:userId
    },function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
    })
}
userSchema.statics.saveUser=function(user,callback){
    this.create({
        user
    },function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
    })
}
const user=mongoose.model('users',userSchema);

module.exports=user;