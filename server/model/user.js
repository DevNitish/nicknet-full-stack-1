const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        require:true
    },
    password: {
        type: String,
        require: true
    },
 
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
userSchema.statics.editUser=function(userDetail, callback)
{
	this.findOne({
		_id:userDetail._id
	},function(err,data)
	{		if(!err){
			data.email=userDetail.email;
			data.name=userDetail.name;
			data.password=userDetail.password;
				data.save(function(err){
					if(err)
						callback(err,null);
					else
					callback(null,data);
				})
				
			}
			else{
				callback(err,null);
			}
				
	})
};

userSchema.statics.saveUser=function(user,callback){
    this.create({
        email:user.email,
        name:user.name,
		password:user.password
    
    },function(err,data){
        if(err){
            console.log('Data Error');

            callback(err,null);
        }else{
            console.log('Data inserted successfully...');
            callback(null,data);
        }
    });
};

userSchema.statics.deleteUser=function(userId, callback)
{		console.log("deleteUser id",userId);
	this.findOne({
		_id:userId
    
	}).remove( ).exec();
	callback(null, 'Deleted');
     
};
const user=mongoose.model('users',userSchema);

module.exports=user;