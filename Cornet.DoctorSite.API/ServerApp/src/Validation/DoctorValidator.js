const Joi = require("joi");
const Schema = {
    Doctorname : Joi.string().min(3).required(),
    About : Joi.string().min(50).required(),
    Phone : Joi.string().min(10).max(10).required(),
    Speciality: Joi.string().required(),
    LogoName:Joi.string().required(),
    Email:Joi.string().required(),
    Address :  Joi.string().min(3).required(),
    Lat : Joi.number().required(),
    Long : Joi.number().required(),
    LogoURL : Joi.string().required(),
    HeroImage : Joi.string().required(),
    AboutImage : Joi.string().required(),
    HostingUrl:Joi.string().required(),
    ServicesImage :  Joi.string().required(),
    TemplateColors : Joi.required(),
    SocialMedia : Joi.array().items(Joi.object({Icon:Joi.string().required(),Url:Joi.string().required()})).min(1).max(4)
}

const options={
    allowUnknown: true  
}
class DoctorValidator{

    Validator(Doctor){
        return Joi.validate(Doctor,Schema,options);
    }


}


module.exports = DoctorValidator ;