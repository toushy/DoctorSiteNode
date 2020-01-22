//require jwt to decode incoming token
const jwt = require('jsonwebtoken');
//require config file to get from it jwtsecret
const Config = require("../../config");
//create object from config s it is class 
const config = new Config();

//auth middleware that take request and response and next
function auth(req,res,next){
    //get token from request header 
    const token = req.header("Authorization");
    //check if thier is no token we send 401 with error message access deneied no token and opeation faild 
    if(!token) return res.status(401).send({Error:"Acess denied . No token Provided",Success:false,Response:null}) ;
    //if token exist we try to decode it 
    try{
        //decode token using our secret key
        const decoded = jwt.verify(token,config.jwtSecret);
        //add decode object to request header in the user
        req.user = decoded;
        //continue user to his function 
        next();
    }
    //if we can't decode token we will at catch 
    catch(ex){
        //we return response 400 and tell user that token is invalid 
       return  res.status(400).send({Error:"Invalid Token ",Success:false,Response:null})
    }
    
   
}

module.exports = auth;