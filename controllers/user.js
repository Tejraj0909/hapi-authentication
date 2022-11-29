'use strict';

const Boom = require('boom');
const Config = require('../utils/config');
const userService = require('../service/user');
const appConstants = require('../utils/appConstants')
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = async (Request, Response) => {

  try {
    let userData = Request.payload;

    const emailCheck = await userService.findFilterUser({ email: userData.email })
    if (emailCheck) {
      throw Boom.badRequest(appConstants.userExistsCode)
    }
    userData.password = userService.encryptString(userData.password)
    await userService.signUpUser(userData)

    return Response.response({ message: appConstants.createdMessage }).code(appConstants.createdCode)

  } catch (err) {
    console.log("signup error: ", err)
    throw Boom.badRequest(appConstants.internalServerMessage)
  }
};


exports.signin = async (Request, Response) => {
  try {
    let userData = await userService.findFilterUser({ email: Request.payload.email });

    if (userData && Bcrypt.compare(Request.payload.password, userData.password)) {
      delete userData.password;
      // Request.cookieAuth.set({ id: userData.id });
      let token = jwt.sign({ accountId: userData.id }, process.env.TOKEN_SECRET);
      return Response.response({ message: 'Successfully login', user: userData }).state('access_token', token).code(appConstants.requestSucceededCode)
    } else {
      throw Boom.badData({errorMessage : appConstants.internalServerMessage,errorObject : error })
    }
  } catch (error) {
    console.log("signin error: ", error)
    throw Boom.badRequest({errorMessage : appConstants.internalServerMessage,errorObject : error })
  }
};

exports.getAll = async (Request, Response) => {
  try {
    const result = await userService.findAllUsers();
    return Response.response({ message: 'Success', userList: result }).code(appConstants.requestSucceededCode)
  } catch (error) {
    throw Boom.badRequest({errorMessage : appConstants.internalServerMessage,errorObject : error })
  }
};



