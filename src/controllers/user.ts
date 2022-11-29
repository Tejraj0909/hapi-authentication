import Boom from 'boom';
import Bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import { ResponseToolkit, Request } from 'hapi';





const signup = async (Request : Request, Response :ResponseToolkit ) => {

    try {
  
      return Response.response('Yes').code(200)
  
    } catch (error : any) {
      console.log("signup error: ", error)
        let err : any = error
        throw Boom.badRequest(err) 
      }
  };
  
  
const signin = async (Request : Request, Response :ResponseToolkit) => {
    try {
     
        return Response.response( 'Successfully login').state('access_token', 'token').code(200)
      
       
      
    } catch (error : any) {
      console.log("signin error: ", error)
      let err : any = error
      throw Boom.badRequest(err) 
    }
  };
  
  const getAll = async (Request : Request, Response :ResponseToolkit) => {
    try {
     
        return Response.response( 'Successfully login').state('access_token', 'token').code(200)
      
       
      
    } catch (error : any) {
      console.log("getAll error: ", error)
      let err : any = error
      throw Boom.badRequest(err) 
    }
  };

export = {getAll, signin, signup}