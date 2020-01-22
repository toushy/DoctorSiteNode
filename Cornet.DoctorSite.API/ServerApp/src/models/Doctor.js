//requrie mongoose object to create Doctor model 
const mongoose = require('mongoose');
//require configuraiton to get config class
const Config = require('../config');

//create object of configuration to get evirongment variables
const config = new Config();
//we specify structure of  Doctor object 
//using mongoose schema 
const DoctorSchema = new mongoose.Schema({
    Doctorname: { type: String, required: true },
    About: { type: String, required: true },
    Email: { type: String, required: true },
    Speciality: String,
    LogoName:String,
    Slogan: String,
    SocialMedia: [{
        Icon: String,
        Url: String
    }],
    Phone: { type: String, required: true, minlength: 10, maxlength: 10 },
    Address: { type: String, required: true },
    Lat: Number,
    Long: Number,
    LogoURL: { type: String, required: true },
    VideoURL: String,
    HeroImage: { type: String, required: true },
    AboutImage: { type: String, required: true },
    ServicesImage: { type: String, required: true },
    Services: [{
        title: String,
        Content: String,
    }],
    Team: [{
        DocotrName: String,
        Description: String,
        ImageUrl:String,
        yearsOfExperience: String,
        SocialMedia: [{
            icon: String,
            Url: String
        }],
    }],
    Reviews: [{
        Rate: Number,
        Comment: String,
    }],
    TemplateColors: {
        BaseColor: String,
        TextColor: String,
        ThirdColor: String,
    },

    HostingUrl:String,
    Status:{
        type: String, 
        enum : ['Published','Binding','Faild'], 
        default: 'Binding' 
    },
    TemplateHtml: String

});

//We add the model to mongoose 
const Doctor = mongoose.model('Doctor', DoctorSchema);
//export Doctor module to be used in another fielse 
module.exports = Doctor;
