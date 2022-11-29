const userController = require('../controllers/user')
const Joi = require('joi');

const userRoute = {
    name: 'userRoute',
    version: '1.0.0',
    register: async function (server, options, next) {
        server.route({
            method: 'POST',
            path: '/signin',
            handler: userController.signin,
            options: {
                auth: {
                    mode: 'try'
                },
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
            handler: userController.signup,
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
            handler: userController.getAll,
            config: {
                auth: 'token'
            }
        });
    }
};

module.exports = userRoute