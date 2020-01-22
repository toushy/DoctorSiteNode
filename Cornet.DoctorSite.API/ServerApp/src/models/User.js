//requrie mongoose object to create user model 
const mongoose = require('mongoose');
//require configuraiton to get config class
const Config = require('../config');

//require jwt to generate token when user login 
const jwt = require('jsonwebtoken');
//create object of configuration to get evirongment variables
const config = new Config();


//we specify structure of  user object 
//using mongoose schema 
const userSchema = new mongoose.Schema({
    Email:{ type: String, required: true },
    Password:{ type: String, required: true },
    UserName:{ type: String, required: true }
});

//create method that generate jwt token emdbeding userid and username
//with key specified in evironment variable 
userSchema.methods.generateAuthToken = function(){
    //generate token and n emdbeding userid and username
    //with key specified in evironment variable 
    const token = jwt.sign({_id:this._id,UserName:this.UserName},config.jwtSecret);
    //retrurn this token 
    return token;
}
//We add the model to mongoose 
const User = mongoose.model('User', userSchema);
//export Doctor module to be used in another fielse 
module.exports = User;
