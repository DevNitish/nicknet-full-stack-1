const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    teacherName: String,
    teacherMail: String,
    teacherSalary: Number,
    teacherPass: String
})


teacherSchema.statics.showallTeachers=function (callback) {
    
    this.find({},function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  })
}

  teacherSchema.statics.addnewTeachers=function (teacherDetail,callback) {
    var newTeacherObj ={
        teacherName: teacherDetail.teacherName,
        teacherMail: teacherDetail.teacherMail,
        teacherSalary: teacherDetail.teacherSalary,
        teacherPass: teacherDetail.teacherPass
        
    };
    console.log("newTeacherObj: ",newTeacherObj);
    this.create(newTeacherObj,function(err,data){
            if(err){
                callback(err,null);
            }else{
                callback(null,data);
            }
    }) 
  }
  teacherSchema.statics.updateTeachers=function (obj,callback) {
    this.findOne({
		_id:obj._id
	},function(err,data)
	{		if(!err){
        data.teacherName= obj.teacherName;
        data.teacherMail= obj.teacherMail;
        data.teacherPass= obj.teacherPass;
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
}

teacherSchema.statics.adminteacherUpdate=function (teacherDetail,callback) {
    this.findOne({
		_id:teacherDetail._id
	},function(err,data)
	{		if(!err){
        data.teacherName= teacherDetail.teacherName;
        data.teacherMail= teacherDetail.teacherMail;
        data.teacherSalary= teacherDetail.teacherSalary;
        data.teacherPass= teacherDetail.teacherPass
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
}




const teacher = mongoose.model('teacher', teacherSchema);
module.exports=teacher;