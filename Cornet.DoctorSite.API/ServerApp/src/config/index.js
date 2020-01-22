const dotenv = require('dotenv');
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
class Config {

  port;
  databaseURL;
  api;
  jwtSecret;
  constructor() {
    this.OnInit();
  }

  OnInit() {
    const envFound = dotenv.config();
    if (!envFound) {
      // This error should crash whole process

      throw new Error("Couldn't find .env file ");
      return;
    }
 
    this.port = envFound.parsed.PORT || 5000;
    /**
     * That long string from mlab
     */
    this.databaseURL = envFound.parsed.MONGODB_URI;
    /**
     * API configs
     */
    this.api = {
      prefix: '/api',
    };

    /**
   * Your secret sauce
   */
  this.jwtSecret = envFound.parsed.JWT_SECRET;

  }


}


module.exports = Config; 
