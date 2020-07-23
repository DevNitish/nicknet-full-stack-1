function saveData(obj){
    $.ajax({
        type:"POST",
        url:"/signup/checkuser",
        data:obj,
        success:function(response){
            console.log('response',response);
            saveUser(obj);
        },
        error: function (){
            console.log("mail exists")
            showError();
        }
    })
}
function showError(){
    $("#alert1").show();
    $("#name").val("");
    $("#email").val("");
    setTimeout(function(){
        $("#alert1").hide();
    }, 2000);
}

function saveUser(obj){
    $.ajax({
        type:"POST",
        url:"/signup/saveUser",
        data:obj,
        success:function(response){
            console.log('response',response);
            alertSuccess();
        }
    })
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
    $("#alert1").hide();
    $("#alert2").hide();
    $("form").submit(function(event){
        event.preventDefault();
        var name = $("#name").val();
        var password = document.getElementById("password").value;
        var email = $("#email").val();
        let obj={
            "name": name,
            "password": password,
            "email" : email
        }
        saveData(obj); 
    });
});