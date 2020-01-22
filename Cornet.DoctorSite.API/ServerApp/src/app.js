//require config file to get all configuration starting from port and dataase url
const Config = require('./config');
//require express framework to create server and routing 
//and access built in middleware 
const express = require( 'express');

//require doctor router and this is our controller 
const doctorRoute = require("./api/routes/Doctor")

//require Images router and this is our Image controller 
const ImagesRoute = require("./api/routes/Images")


//require middleware to enable crossvalidation 
const crossvalidation = require("./api/middlewares/CorssOrigin");

//requrie mongoose object to connect to DB
const mongoose = require('mongoose');

//var Vibrant = require('node-vibrant')

//create object from configuration class 
const config = new Config();

//connect to database speicfied in the env file using 
//variable databaseURL and specify mongoose properties  { useUnifiedTopology: true,useNewUrlParser: true }
//this promise will return success or exception 
//in success we just consolse database connected
//in failure we show error message 
mongoose.connect(config.databaseURL,
  { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
      console.log("Connected to MongoDB");
  })
  .catch(err => console.log("couldn't connect to MongoDB", err));

//create fucntion that start our server using port specified in env file 
//that contained in the configuration class 
async function startServer() {
  //create object of express framework 
  const app = express();

  //call express built in middleware that convert the request into json object  
  //if header is application json
  app.use(express.json());
  
  

  app.use(crossvalidation)
  //call express built in middleware that convert the request into json object  
  //if header is x-fomrat-urlencode
  app.use(express.urlencoded({extended: true}));

  //create router that navigate all requests that contain Api/Doctor 
  //To Doctor controller 
  app.use('/Api/Doctor',doctorRoute);

  //create router that navigate all requests that contain Api/Images 
  //To Images controller 
  app.use('/Api/Images',ImagesRoute);

  //start server with specified port 
  app.listen(config.port, err => {
    //if error occure  
    if (err) {
      //show  error
      console.log(err);
      //stop the current proccess  and return 
      process.exit(1);
      return;
    }
    //else we show message that indeicate the process runs successfully
    console.log(`
      ################################################
        Server listening on port: ${config.port}  
      ################################################
    `);
  });
}

//call function that run the server
startServer();


/*
Vibrant.from('https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687').getPalette()
  .then((palette) => console.log(palette))
 */