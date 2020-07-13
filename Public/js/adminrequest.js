function setValue(id){
        $("#courseId").html(id);
}


function updateallData(){
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


function successMsg(){
    setTimeout(function(){
        alert("edit saved");
    }, 2000);
}




function saveData(){
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
    setTimeout(function(){
        $("#alert1").hide();
    }, 2000);
}



$(document).ready(function(){
    $("#alert1").hide();
 
});