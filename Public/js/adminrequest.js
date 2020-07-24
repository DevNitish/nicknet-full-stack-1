console.log("adminCourses ",adminCourses)
let teacherToBeDeleteId=null;
let courseToBeDeleteId=null;
let queryToBeDeleteId=null;
let dataToBeDeleteId={
    id:null,
    type:null
};


function setValue(id){
    console.log("id ", id)
    let course = null;
    adminCourses.filter(o => {
        if (o._id == id) {
            course = o
        }
    })
    $("#courseId").html(id);
    $('#course-name').val(course.courseName);
    $('#message-text').val(course.courseDesc);
    $('#course-duration').val(course.courseDuration);
    $('#course-price').val(course.coursePrice);
    $('#course-banner').val(course.courseBanner);
    $('#course-teacher').val(course.courseTeacher);
}




function setteacherId(id,tName,tMail,tPass,tSalary){
    $("#teacherId").html(id);
    console.log("name ",tName)
    console.log("mail ",tMail)
    console.log("pass ",tPass)
    console.log("salary ",tSalary)

    $('#teacher-name').val(tName);
    $('#teacher-mail').val(tMail);
    $('#teacher-pass').val(tPass);
    $('#teacher-salary').val(tSalary);
}


function updateallData(obj){
 
        $.ajax({
            type:"POST",
            url:"/admin/course/editcourse",
            data:obj,
            success:function(response){
                console.log('response',response);
                successMsg();
            },
            error: function (){
                console.log("can't edit course");
            }
        })

    }


    function updateteacherData(obj){
 
        $.ajax({
            type:"POST",
            url:"/admin/teacher/editteacher",
            data:obj,
            success:function(response){
                console.log('response',response);
                successteacherMsg();
            },
            error: function (){
                console.log("can't edit teacher");
            }
        })

    }   


function successMsg(){
    $("#alert2").show();
    setTimeout(function(){
        $("#alert2").hide();
        $("#modal").modal("hide");
    }, 2000);
}

function successteacherMsg(){
    $("#alert3").show();
    setTimeout(function(){
        $("#alert3").hide();
        $("#modal1").modal("hide");
    }, 2000);
}



function saveData(obj){
 
    $.ajax({
        type:"POST",
        url:"/admin/course/addnewcourse",
        data:obj,
        success:function(response){
            console.log('response',response);
            alertSuccess()
        },
        error: function (){
            console.log("can't add course");
        }
    })

}

function alertSuccess(){
    $("#alert1").show();
    $("#courseName").val("");
   $("#courseDuration").val("");
   $("#courseDesc").val("");
    $("#coursePrice").val("");
     $("#courseBanner").val("");
     $("#courseTeacher").val("");
    setTimeout(function(){
        $("#alert1").hide();
    }, 2000);
}

//deletion functions





function removeTeacher(id){
    let obj ={
        "_id" :id
    }
    $.ajax({
        type:"POST",
        url:"/admin/teacher/deleteTeacher",
        data: obj,
        success:function(response){
            console.log('response',response);
            dataToBeDeleteId=null
        },
        error: function (){
            dataToBeDeleteId=null
            console.log(" not deleted");
            failureModal();
        }
    })
    
}

function removeCourse(id){
    let obj ={
        "_id" :id
    }
    $.ajax({
        type:"POST",
        url:"/admin/course/deletecourse",
        data: obj,
        success:function(response){
            dataToBeDeleteId=null
            console.log('response',response);
        },
        error: function (){
            console.log(" not deleted");
            dataToBeDeleteId=null
            failureModal();
        }
    })
    
}


function removeQuery(id){
    let obj ={
        "_id" :id
    }
    $.ajax({
        type:"POST",
        url:"/admin/query/deleteQuery",
        data: obj,
        success:function(response){
            dataToBeDeleteId=null
            console.log('response',response);
        },
        error: function (){
            console.log(" not deleted");
            dataToBeDeleteId=null
            failureModal();
        }
    })

}

function deleteModal(id,deleteType){
    dataToBeDeleteId.id=id
    dataToBeDeleteId.type=deleteType
    $('#modaltext').html("Do you want to delete?")
    $('#modal3').modal('show');
}
function deleteData(){
    if(dataToBeDeleteId.type=='c'){
        removeCourse(dataToBeDeleteId.id)
    }
    else if(dataToBeDeleteId.type=='q')
        removeQuery(dataToBeDeleteId.id)
    else if(dataToBeDeleteId.type=='t')
        removeTeacher(dataToBeDeleteId.id)
}
function failureModal(){
    $('#modaltext').html("Oops! looks like we just hit a roadblock, try again orcontact the website admin if the problem persosts")
    $('#modal3').modal('show');
}

$(document).ready(function(){
    $("#alert3").hide();
    $("#alert1").hide();
    $("#alert2").hide();
    $("#form1").submit(function(event){
        event.preventDefault();
        var courseName = $("#courseName").val();
        var courseDuration = $("#courseDuration").val();
        var courseDesc = $("#courseDesc").val();
        var coursePrice = $("#coursePrice").val();
        var courseBanner = $("#courseBanner").val();
        var courseTeacher = $("#courseTeacher").val();
        
        let obj={
            "courseName" : courseName ,
            "courseDuration": courseDuration,
            "courseDesc": courseDesc,
            "coursePrice": coursePrice,
            "courseBanner": courseBanner,
            "courseTeacher": courseTeacher
            
        }
        saveData(obj); 
    });
 

    $("#form2").submit(function(event){
        event.preventDefault();
        var id = $("#courseId").html();
        var courseName = $("#course-name").val();
        var courseDuration = $("#course-duration").val();
        var courseDesc = $("#message-text").val();
        var coursePrice = $("#course-price").val();
        var courseBanner = $("#course-banner").val();
        var courseTeacher = $('#course-teacher').val();
    
     let obj={
                "_id": id,
                "courseName" : courseName ,
                "courseDuration": courseDuration,
                "courseDesc": courseDesc,
                "coursePrice": coursePrice,
                "courseBanner": courseBanner,
                "courseTeacher": courseTeacher
                
                
            }
    
            updateallData(obj); 
    });


    $("#form3").submit(function(event){
        event.preventDefault();
        var teacherName = $("#teacher-name").val();
        var teacherMail = $("#teacher-mail").val();
        var teacherPass = document.getElementById("teacher-pass").value;
        var id = $("#teacherId").html();
        var teacherSalary = $("#teacher-salary").val();

        
    
     let obj={
                "_id": id,
                "teacherName" : teacherName ,
                "teacherMail": teacherMail,
                "teacherPass": teacherPass,    
                "teacherSalary": teacherSalary  
            }
    
            updateteacherData(obj); 
    })

});