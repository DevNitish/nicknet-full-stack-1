function setValue(id,cName,cDesc,cDuration,cPrice,cImage){
        $("#courseId").html(id);
        console.log("course ",cName)
        console.log("cDesc ",cDesc)
        console.log("cDuration ",cDuration)
        console.log("cPrice ",cPrice)
    
        $('#course-name').val(cName);
        $('#message-text').val(cDesc);
        $('#course-duration').val(cDuration);
        $('#course-price').val(cPrice);
        $('#course-banner').val(cImage);
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
            url:"http://localhost:8080/admin/course/editcourse",
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
            url:"http://localhost:8080/admin/teacher/editteacher",
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
        url:"http://localhost:8080/admin/course/addnewcourse",
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
        url:"http://localhost:8080/admin/teacher/deleteTeacher",
        data: obj,
        success:function(response){
            console.log('response',response);
            successModal();
        },
        error: function (){
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
        url:"http://localhost:8080/admin/course/deletecourse",
        data: obj,
        success:function(response){
            console.log('response',response);
            successModal();
        },
        error: function (){
            console.log(" not deleted");
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
        url:"http://localhost:8080/admin/query/deleteQuery",
        data: obj,
        success:function(response){
            console.log('response',response);
            successModal();
        },
        error: function (){
            console.log(" not deleted");
            failureModal();
        }
    })

}

function successModal(){
    $('#modaltext').html("Alright! The changes has been done you can now refresh the page to view them!")
    $('#modal3').modal('show');
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
        
    
     let obj={
                "_id": id,
                "courseName" : courseName ,
                "courseDuration": courseDuration,
                "courseDesc": courseDesc,
                "coursePrice": coursePrice,
                "courseBanner": courseBanner
                
                
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