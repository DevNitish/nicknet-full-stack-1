const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: String,
    courseDesc: String,
    coursePrice: Number,
    courseDuration: Number
})

courseSchema.statics.getAllCourses=function (callback) {
    //This 'find' function takes two parameters: 1st object to find 2nd a callback function
    this.find({},function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  })
}
  

  courseSchema.statics.addnewCourses=function (courseDetail,callback) {
    var newCourseObj ={
        courseName: courseDetail.courseName,
        courseDesc: courseDetail.courseDesc,
        coursePrice: courseDetail.coursePrice,
        courseDuration: courseDetail.courseDuration
    };
    console.log("newCourseObj: ",newCourseObj);
    this.create(newCourseObj,function(err,data){
            if(err){
                callback(err,null);
            }else{
                callback(null,data);
            }
    }) 
  }
  courseSchema.statics.updateCourses=function (obj,callback) {
    this.findOneAndupdate({courseName:obj.name},{courseDesc:obj.desc},{coursePrice:obj.price},{courseDuration:obj.duration}),function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  }
}
  courseSchema.statics.deleteCourse=function (courseId, callback) {
      console.log('courseId',courseId);
    this.findOneAndDelete(
        {_id:courseId}
    ,function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
  })
}




const course = mongoose.model('course', courseSchema);
module.exports=course;