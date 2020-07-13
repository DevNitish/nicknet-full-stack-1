function checkData(obj){
    $.ajax({
        type:"POST",
        url:"http://localhost:8080/login/checklogin",
        data:obj,
        success:function(response){
            console.log('response',response);
            alertSuccess()
        },
        error: function (){
            console.log("mail exists")
            showError();
        }
    })
}
function showError(){
    $("#alert1").show();
    $("#email").val("");
    setTimeout(function(){
        $("#alert1").hide();
    }, 2000);
}



function alertSuccess(){
    $("#alert2").show();
    $("#name").val("");
    $("#email").val("");
    setTimeout(function(){
        $("#alert2").hide();
    }, 2000);
}




$(document).ready(function(){
    $("#alert2").hide();
    $("#alert1").hide();
    $("form").submit(function(event){
        event.preventDefault();
        var email = $("#email").val();
        var password = document.getElementById("password").value;
        
        let obj={
            "email" : email,
            "password": password,
            
        }
        checkData(obj); 
    });
});