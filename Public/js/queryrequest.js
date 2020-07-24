function saveData(obj){
    $.ajax({
        type:"POST",
        url:"/contactus/sendquery",
        data:obj,
        success:function(response){
            console.log('response',response);
            alertSuccess()
        },
        error: function (){
            console.log("can't send query")
        }
    })

}


function alertSuccess(){
    $("#alert1").show();
    $("#queryUser").val("");
   $("#queryuserMail").val("");
   $("#queryDesc").val(""); 
   $("#queryMobile").val(""); 
    setTimeout(function(){
        $("#alert1").hide();
    }, 2000);
}




$(document).ready(function(){
    $("#alert1").hide();
    $("form").submit(function(event){
        event.preventDefault();
        var queryUser = $("#queryUser").val();
        var queryuserMail = $("#queryuserMail").val();
        var queryDesc = $("#queryDesc").val();     
        var queryMobile = $("#queryMobile").val();     
        let obj={
            "queryUser" : queryUser,
            "queryuserMail": queryuserMail,
            "queryDesc": queryDesc,
            "mobileNumber": queryMobile           
        }
        saveData(obj) ;
    });
});