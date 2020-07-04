const log = $("#logmsg");
const logerror = $("#logerror");
log.hide();
logerror.hide();
//const userName = "";


$(document).ready(function(){
    $("form").submit(function(){
        let x = $("#inputEmail").val();
        let y = $("#inputName").val();
        let z = $("#gridCheck1").is(":checked");
        if(x == "" || y == "" || z == false){
            logerror.show();
            $("#logerror").html("Please fill the missing details!");
            setTimeout(function(){
                logerror.hide();
            },3000);
           return false;
        }else {
            log.show();
            $("#logmsg").html("Thanks ! we'll contact you shortly!" + " " + y);
            setTimeout(function(){
                log.hide();
            },3000);
            return false;
        }
    });

});

























/* const log = document.getElementById('logmsg');
const logerror = document.getElementById('logerror');
log.style.display = "none";
logerror.style.display = "none";
let userName = ""
function validateForm() {
    var x = document.forms["form1"]["inputEmail"].value;
    var y = document.forms["form1"]["inputName"].value;
    var z = document.forms["form1"]["gridCheck1"].checked;
    var name1 = document.forms["form1"]["inputName"].value;
    if (x == "" || y == "" || z == false) {
        logerror.textContent = "Enter your details";
        logerror.style.display = "block";
        return false;
    } else{
        log.textContent = "Mail Submitted , we'll contact you shortly" + " "+ name1;
        log.style.display = "block";
        return false;
    }
} */