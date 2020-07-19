const express =require("express");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const path=require("path");
const config= require("./dev.json");
const mainRoute=require("./server/routes/index");
const courseRoute=require("./server/routes/course");
const loginRoute=require("./server/routes/userlogin");
const signupRoute=require("./server/routes/usersignup");
const teacherRoute=require("./server/routes/teacher");
const queryRoute=require("./server/routes/query");
const contactRoute=require("./server/routes/contactus");
const teachereditRoute=require("./server/routes/adminteacher")
const coursepageRoute=require("./server/routes/coursepage")
const adminRoute=require("./server/routes/admin")
const Course= require("./server/model/coursemodel");
const User = require("./server/model/user");
const Teacher=require("./server/model/teachermodel");
const app=express();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var port=process.env.PORT || 8080;

mongoose.set('useCreateIndex', true);
//login
//https://github.com/passport/express-4.x-local-example
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
    function(username, password, cb) {
        User.findUserByEmail(username, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      });
    }));
  
  
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    User.findOneUser(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
  

//views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(require('morgan')('combined'));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//connecting to database
mongoose.connect(config.connectionstring , { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.connection.once('open' , function(){
    console.log('database on');

}).on('error' , function(error){
    console.log(error);
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use("/signup",signupRoute)
app.get('/login',
  function(req, res){
    res.render('login');
  });

//somewhat working
// app.post('/login',function(req, res,next){
//     console.log("===>",req.body)
//     next();
//   }, passport.authenticate('local', { successRedirect:  "/admin" ,failureRedirect: "/" }));


app.post('/login',passport.authenticate('local'),  function(req, res) {
// If this function gets called, authentication was successful.
// `req.user` contains the authenticated user.
// res.redirect('/users/' + req.user.username);
    res.send({data:"valid user"});
});


// app.post('/login',function(req, res,next){
//     console.log("===>",req.body)
//     res.redirect("http://www.stackoverflow.com");
//     next()
//   });

 app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });
app.use("/",mainRoute)
app.use("/admin",
// passport.authenticate('local', { session: false }),
require('connect-ensure-login').ensureLoggedIn(),
adminRoute)
app.use(express.static(path.join(__dirname, 'public')))

app.use("/admin/admincourse",courseRoute)
// app.use("/admin/teacher",teacherRoute)


app.use("/courses", urlencodedParser,coursepageRoute)
app.use("/contactus", urlencodedParser,contactRoute)
app.use("/admin/course", urlencodedParser,courseRoute)
app.use("/admin/query", urlencodedParser,queryRoute)
app.use("/admin/teacher", urlencodedParser,teachereditRoute)
app.listen(port,function(){
    console.log("App is running on port ",port);
})


