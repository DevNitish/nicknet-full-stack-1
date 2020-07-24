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
    $("#modelDuration").html(course.courseDuration + " Weeks")
    $("#modelPrice").html(course.coursePrice == 0 ? "FREE! " : course.coursePrice)
    $('#modelImage').attr('src', course.courseBanner);

}