const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    coursename: String,
    coursedesc: String,
    courseprice: Number,
    courseduration: Number
})

courseSchema.statics.showallCourses=function (callback) {
    this.find({}),function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  }
}
  

  courseSchema.statics.addnewCourses=function (obj,callback) {
    this.save(obj),function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  } 
  }
  courseSchema.statics.updateCourses=function (obj,callback) {
    this.findOneAndupdate({coursename:obj.name},{coursedesc:obj.desc},{courseprice:obj.price},{courseduration:obj.duration}),function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  }
}




const course = mongoose.model('course', courseSchema);
module.exports=course;