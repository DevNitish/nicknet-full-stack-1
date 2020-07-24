console.log("siteCourses ",siteCourses)
function getModel(id) {
    console.log("id ", id)
    let course = null;
    siteCourses.filter(o => {
        if (o._id == id) {
            course = o
        }
    })
    $("#exampleModalLabel").html(course.courseName)
    $("#modelDesc").html(course.courseDesc)
    $("#modelDuration").html("Duration: "+course.courseDuration + " Weeks")
    let fee=course.coursePrice == 0 ? "FREE! " : course.coursePrice
    $("#modelPrice").html("")
    $('#modelImage').attr('src', course.courseBanner);

}