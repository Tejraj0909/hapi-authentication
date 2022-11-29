import  userController  from '../controllers/user';
import { Server } from '@hapi/hapi';
import Joi  from 'joi';


 const userRoute =  {
      name: 'userRoute',
      version: '1.0.0',
     register: async function (server : Server) {
    server.route({
      method: 'POST',
      path: '/signup',
      handler: userController.signup ,
      options: {
        auth: false,
        validate: {
            payload: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string()
            })
        }
      }
    });

    server.route({
        method: 'POST',
        path: '/signin',
        handler: userController.signin ,
        options: {
          auth: false,
          validate: {
              payload: Joi.object({
                  email: Joi.string().email().required(),
                  password: Joi.string()
              })
          }
        }
      });

    server.route({
        method: 'GET',
        path: '/getAll',
        handler: userController.getAll ,
        options: {
          auth: false
        }
      });
  
    }
}

export = userRoute