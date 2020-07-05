const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating cars schema
const SignupSchema = new Schema({
    username: String,
    password: String
});

//creating model for using in other files
const SignupStuff = mongoose.model('account', SignupSchema);
module.exports = SignupStuff;