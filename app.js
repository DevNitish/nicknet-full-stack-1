const express =require("express");
const mongoose=require("mongoose");
const path=require("path");
const config= require("./dev.json");
const mainRoute=require("./server/routes/index")
const courseRoute=require("./server/routes/course")
const app=express();
var port=process.env.PORT || 8080;


//Connect to Mongo using mongoose
app.use(function(req, res, next) {
    if (mongoose.connection.readyState != 1) {
        mongoose.connect(config.connectionstring, function(error) {
            if (error) {
                console.log("error while connecting to mongo");
                throw error;
                // Handle failed connection
            } 
            console.log('conn ready:  ' + mongoose.connection.readyState);
            next();
        });
    } else {
        next();
    }
});

app.use("/",mainRoute)
app.use(express.static(path.join(__dirname, 'public')))

app.get("/admin",function(){
    app.sendFile(__dirname + "/public/" + "admin.html")
})
app.use("/admin/admincourse",courseRoute)
app.listen(port,function(){
    console.log("App is running on port ",port);
})


