const express =require("express");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const path=require("path");
const config= require("./dev.json");
const mainRoute=require("./server/routes/index");
const courseRoute=require("./server/routes/course");
const loginRoute=require("./server/routes/userlogin");
const signupRoute=require("./server/routes/usersignup");
const queryRoute=require("./server/routes/query");
const contactRoute=require("./server/routes/contactus");
const teachereditRoute=require("./server/routes/adminteacher")
const coursepageRoute=require("./server/routes/coursepage")
const Course= require("./server/model/coursemodel");
const User = require("./server/model/user");
const app=express();
var port=process.env.PORT || 8080;

mongoose.set('useCreateIndex', true);


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));


//connecting to database
mongoose.connect(config.connectionstring , { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.connection.once('open' , function(){
    console.log('database on');

}).on('error' , function(error){
    console.log(error);
});

/*app.get('/',(req,res)=>{
    res.status(200).send('Hi welcome to Login and Signup API');
}) */

app.use("/signup",signupRoute)
app.use("/login",loginRoute)
app.use("/", urlencodedParser,mainRoute)
app.use(express.static(path.join(__dirname, 'public')))

app.get("/contactus",function(req,res){
    res.sendFile(__dirname + "/public/" + "contact.html")
})

app.get("/signup",function(req,res){
    res.sendFile(__dirname + "/public/" + "signup.html")
})
app.get("/login",function(req,res){
    res.sendFile(__dirname + "/public/" + "login.html")
})
app.get("/admin",function(req,res){
    res.sendFile(__dirname + "/public/" + "admin.html")
})


app.use("/courses", urlencodedParser,coursepageRoute)
app.use("/contactus", urlencodedParser,contactRoute)
app.use("/admin/course", urlencodedParser,courseRoute)
app.use("/admin/query", urlencodedParser,queryRoute)
app.use("/admin/admin-teacher", urlencodedParser,teachereditRoute)
app.listen(port,function(){
    console.log("App is running on port ",port);
})


