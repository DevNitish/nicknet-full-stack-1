function getModel(cName,cDesc,cDuration,cPrice,cImage){
    console.log("course ",cName)
    console.log("cDesc ",cDesc)
    console.log("cDuration ",cDuration)
    console.log("cPrice ",cPrice)

    $("#exampleModalLabel").html(cName)
    $("#modelDesc").html(cDesc)
    $("#modelDuration").html(cDuration+" Hours")
    $("#modelPrice").html(cPrice==0?"FREE! ":cPrice)
    $('#modelImage').attr('src',cImage);

}