const express =require("express");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const path=require("path");
const config= require("./dev.json");
const mainRoute=require("./server/routes/index");
const courseRoute=require("./server/routes/course");
const loginRoute=require("./server/routes/userlogin");
const signupRoute=require("./server/routes/usersignup");
const User = require("./server/model/user");
const app=express();
var port=process.env.PORT || 8080;

mongoose.set('useCreateIndex', true);
//Connect to Mongo using mongoose
/* app.use(function(req, res, next) {
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
}); */

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//connecting to database
mongoose.connect(config.connectionstring , { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.connection.once('open' , function(){
    console.log('database on');
    
}).on('error' , function(error){
    console.log(error);
});

app.get('/',(req,res)=>{
    res.status(200).send('Hi welcome to Login and Signup API');
})

app.use("/signup",signupRoute)
app.use("/login",loginRoute)
app.use("/",mainRoute)
app.use(express.static(path.join(__dirname, 'public')))

app.get("/signup",function(req,res){
    res.sendFile(__dirname + "/public/" + "signup.html")
})
app.get("/login",function(req,res){
    res.sendFile(__dirname + "/public/" + "login.html")
})
app.get("/admin",function(req,res){
    res.sendFile(__dirname + "/public/" + "admin.html")
})
app.use("/admin/admincourse",courseRoute)
app.listen(port,function(){
    console.log("App is running on port ",port);
})


