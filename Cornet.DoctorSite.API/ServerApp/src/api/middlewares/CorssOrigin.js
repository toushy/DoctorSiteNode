function CrossOrigin(req,res,next){

  var allowedOrigins = ['http://127.0.0.1:4200', 'http://localhost:4200', 'http://127.0.0.1:4000', 'http://localhost:4000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
}

module.exports = CrossOrigin;