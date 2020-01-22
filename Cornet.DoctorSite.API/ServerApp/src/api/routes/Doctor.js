//require express framework to create routers
//that we will use to call doctor services
const express  = require("express");

//require auth middleware to authinticate user before excute route
const auth = require('../middlewares/auth');
//require docotr services to use crud services of doctir
const DoctorService = require("../../services/DoctorService");

//require doctor validation class to validate incoming doctor object 
const DoctorValidator = require('../../Validation/DoctorValidator');
//create object of doctor service class 
const doctorServiceOject = new DoctorService();

//create object from doctor calidator 
const doctorValidator = new DoctorValidator();
//create object of router
const router = express.Router();


//this action responsable for handling /Api/Doctor/id 
//Get request
router.get('/',(req,res)=>{
    //get host of doctor  from the incoming request
    const requestHost = req.get('origin') ; 
    //call get doctor service using doctor id
    doctorServiceOject.Get(requestHost)
                      .then(doctor=>{
                        //if object reutrned we return status 200 and success true 
                        //and return doctor object   
                        return res.status(200).send({Error:"",Success:true,Response:doctor});
                      })
                      .catch(err=>{
                         //if error occure we return staus 400 and error message and success false 
                         //with null object in the response  
                        return res.status(400).send({Error:err,Success:false,Response:null});
                      });

});

//Check if exist in DB
router.post('/CheckExist',(req,res)=>{
  //get host of doctor  from the incoming request
  const requestHost = req.body.requestHost ;
  if(!requestHost) return res.status(400).send({Error:"Please Provide Url",Success:false,Response:null});
  //checking if exist
  doctorServiceOject.CheckExist(requestHost)
                    .then(doctor=>{
                      console.log(doctor);
                      //if no error ocurred  then return status 200 and success true                     
                      return res.status(200).send({Error:"",Success:true,Response:{Exist:doctor}});
                    })
                    .catch(err=>{
                       //if  error occured then return staus 400 and error message and success false            
                      return res.status(400).send({Error:err,Success:false,Response:null});
                    });

});

//this action responsable for handling /Api/Doctor/
//Post  request add new doctor to databse 
//and authinticate user request
//router.post('/',auth,(req,res)=>{
router.post('/',(req,res)=>{
  // get Request body 
  var doctorObject  = req.body;

  //calling validation using joi 
  var Validationresult = doctorValidator.Validator(doctorObject);
  //check if error occure during validation process  we return error message to user            
  if(Validationresult.error)
   return  res.status(400).send({Error:Validationresult.error.details[0].message,Success:false,Response:null});

  //call docotr service that save doctor object 
  doctorServiceOject.Post(doctorObject)
                    .then(doctor=>{
                         //if object reutrned we return status 200 and success true 
                        //and return doctor object   
                        return res.status(200).send({Error:"",Success:true,Response:doctor});
                    })
                    .catch(err=>{
                          console.log(err);
                          return ;
                          //if error occure we return staus 400 and error message and success false 
                         //with null object in the response  
                         return res.status(400).send({Error:err,Success:false,Response:null});
                    });

});


//this action responsable for handling /Api/Doctor/
//update request update current doctor in  databse 
router.put('/:id',(req,res)=>{

});

//this action responsable for handling  /Api/Doctor/ChangeDeployStatus
//we update doctor request                     
router.post('/ChangeDeployStatus',(req,res)=>{
    //check if user provide request host 
    if(!req.body.RequestHost) return res.status(400).send({Error:"Please Provide Doctor Hosting Url ",Success:false,Response:null});
    //check if user provide request stauts 
    if(!req.body.Status) return res.status(400).send({Error:"Please Provide Doctor Status ",Success:false,Response:null});
    //update Doctor  status 
    doctorServiceOject.UpdateStatus(req.body)
                      .then(response=>{
                        if(response) return res.status(200).send({Error:"",Success:true,Response:null});
                         return res.status(400).send({Error:"SomeThing Went Wrong",Success:false,Response:null});
                      })
                      .catch(err=>{
                        return res.status(400).send({Error:err,Success:false,Response:null});
                      });
});



module.exports = router;