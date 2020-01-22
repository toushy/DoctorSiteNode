const Doctor = require("../models/Doctor");

class DoctorService{

    constructor(){}
    async Post(doctorObj){
        //create new docotr object 
        const doctor = new Doctor(doctorObj);
        //save doctor to database  and return docotr object 
         return   await doctor.save();
    }

    //get doctor using doctor id 
    async Get(RequestHost){
        //user docotor model and pass doctor id
        const doctor = await Doctor.find({HostingUrl:RequestHost}).limit(1);
        //return doctor object 
        return doctor;
    }

    //update status of the current doctor packge published or not 
    async UpdateStatus(Payload){
           //user docotor model and pass doctor hosting url exist 
           const doctors = await Doctor.find({HostingUrl:Payload.RequestHost}).limit(1);
           //if thier is no doctors  return false
           if(doctors.length == 0)
                return false;
           //else get doctor by id      
           const currentDoctor = await Doctor.findById(doctors[0]._id);
           //if not exist return false
           if(!currentDoctor)
                return false;
            //else update status of the doctor package 
            console.log(currentDoctor);   
            currentDoctor.Status = Payload.Status;
            try{
                 //try to save changes 
                 currentDoctor.save();
                 //return true
                 return true;
            }
            catch(err){
                //else return false
                return false;
            }
          
    }
    

      //Check doctor exist or not 
      async CheckExist(RequestHost){
        //find url 
        const doctor = await Doctor.find({HostingUrl:RequestHost}).limit(1);
        //check exist
        if (doctor.length!=0) {
            return true;
        }
        else {
            return false;
        }
       
    }
    
   
}



module.exports = DoctorService;
