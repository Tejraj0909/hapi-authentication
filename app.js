const Hapi = require("@hapi/hapi");

const dotenv = require('dotenv')
dotenv.config()


const init = async () => {


  
    let server  =  Hapi.Server({
     port: 3000,
     host: "localhost",
   
     
   });
  
 
     
     server.start();
     
     console.log(`Server started at ${ server.info.uri }`);
     }
     
   
 
 init();