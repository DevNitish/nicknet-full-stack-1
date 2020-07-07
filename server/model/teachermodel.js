const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    teacherName: String,
    teacherMail: String,
    teacherSalary: Number,
    teacherPass: String
})

teacherSchema.statics.showallTeachers=function (callback) {
    this.find({}),function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  }
}
  

  teacherSchema.statics.addnewTeachers=function (obj,callback) {
    obj.save(),function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  } 
  }
  teacherSchema.statics.updateTeachers=function (obj,callback) {
    this.findOneAndupdate({teachersalary:obj.salary}),function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  }
}




const teacher = mongoose.model('teacher', teacherSchema);