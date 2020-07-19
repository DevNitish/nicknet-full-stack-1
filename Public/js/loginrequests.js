function checkData(obj){
    $.ajax({
        type:"POST",
        url:"/login",
        data:obj,
        success:function(response){
            console.log('response success',response);
            window.location.replace("/admin");
            alertSuccess()
        },
        error: function (e){
            console.log("Err ",e)
            showError();
        }
    })
}
function showError(){
    $("#alert1").show();
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
            "username" : email,
            "password": password,
            
        }
        checkData(obj); 
    });
});