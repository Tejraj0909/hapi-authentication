
const Joi = require('joi');

const userRoute = {
    name: 'userRoute',
    version: '1.0.0',
    register: async function (server, options, next) {


       server.route({
            method: 'POST',
            path: '/signin',
        //    handler:  ,
            options: {
               
                validate: {
                        payload: Joi.object({
                            email: Joi.string().email().required(),
                            password: Joi.string().min(8).max(200).required()
                        })
                    }
                },
			
        });
    
        server.route({
            method: 'POST',
            path: '/signup',
          //  handler: 
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
            path: '/created',
       //     handler: 
           
        });
    }
};

module.exports = userRoute