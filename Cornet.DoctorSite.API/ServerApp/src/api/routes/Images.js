//require express framework to create routers
//that we will use to call doctor services
const express  = require("express");

//require Images services to use endpoints 
const ImagesService = require("../../services/ImagesService");

//require auth middleware to authinticate user before excute route
const auth = require('../middlewares/auth');

//require multer to save images in specified path 
const multer = require('multer');

//require path to get extension of the image
var path = require('path')

//create object of Images service class 
const imagesServiceOject = new ImagesService();


//create object of router
const router = express.Router();

//set properites of multer to like saving folder 
//image name and extesnions
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.filename + '-' + Date.now()+path.extname(file.originalname))
    }
  });

  const upload = multer( { storage: storage });

//this action responsable for handling /Api/Images 
//Get request
router.post('/GetColors',(req,res)=>{
    //get image url from request 
    const ImageUrl = req.body.ImageUrl;
    //if thier is no url return that no image url exist 
    if(!ImageUrl) return res.status(400).send({Error:"No Url Specified For Iamge" ,Success:false,Response:null});
    //if url exist call getimagecolor service 
    imagesServiceOject.GetImageColor(ImageUrl)
                      .then(response=>{
                          imagesServiceOject.GetDominateColor(ImageUrl)
                          .then(resp=>{
                            console.log(resp);
                            //if response okay return 200 and result  
                            return res.status(200).send({Error:"" ,Success:true,Response:{colors:response,DominateColor:resp}});
                          })
                          .catch(err=>{
                                console.log(err);
                                //if response okay but get dominate error  return 200 and result with all colors   
                                return res.status(200).send({Error:"" ,Success:true,Response:{colors:response,DominateColor:null}});
                          });
                       
                      })
                      .catch(err=>{
                          //if error occure return 400 with the error 
                          return res.status(400).send({Error:err ,Success:false,Response:null});
                      });
});


//this action responsable for handling /Api/Doctor/
//update request update current doctor in  databse 
router.post('/',upload.single("picture"),(req,res)=>{
    // if file saved we return okay and file path 
    if(req.file) return  res.status(200).send({Error:"",Success:true,Response:{Url:req.file.path}});
    //else we return error 
    return res.status(400).send({Error:"Something Went Wrong",Success:false,Response:null});
   
});




module.exports = router;