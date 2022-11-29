import Boom from "boom";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResponseToolkit, Request } from "hapi";
import userService from "../services/user";
import appConstants from "../utils/appConstants";

const signup = async (Request: any, Response: ResponseToolkit) => {
  try {
    let userData = Request.payload;
    const emailCheck = await userService.findFilterUser({
      email: userData.email,
    });
    if (emailCheck) {
      throw Boom.badRequest("User Exist");
    }
    userData.password = userService.encryptString(userData.password);
    await userService.signUpUser(userData);

    return Response.response("Yes").code(200);
  } catch (error: any) {
    console.log("signup error: ", error);
    let err = error;
    throw Boom.badRequest(err);
  }
};

const signin = async (Request: any, Response: ResponseToolkit) => {
  try {
    let userData = await userService.findFilterUser({
      email: Request.payload.email,
    });

    if (
      userData &&
      (await Bcrypt.compare(Request.payload.password, userData.password))
    ) {
      delete userData.password;
      // Request.cookieAuth.set({ id: userData.id });
      let token = jwt.sign(
        { accountId: userData.id },
        appConstants.TOKEN_SECRET
      );
      return Response.response({
        message: "Successfully login",
        user: userData,
      })
        .state("access_token", token)
        .code(appConstants.requestSucceededCode);
    } else {
      throw Boom.badRequest("Incorrect Password or Email");
    }
  } catch (error: any) {
    console.log("signin error: ", error);
    let err: any = error;
    throw Boom.badRequest(err);
  }
};

const getAll = async (Request: any, Response: ResponseToolkit) => {
  try {
    const result = await userService.findAllUsers();
    return Response.response({ message: 'Success', userList: result }).code(appConstants.requestSucceededCode)
  } catch (error : any) {
    throw Boom.badRequest(error)
  }
};

export = { getAll, signin, signup };
