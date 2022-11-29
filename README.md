# HAPI_AUTH

This project was generated with [NodeJs](https://nodejs.org/en/) and [HapiJs](https://hapi.dev/tutorials/gettingstarted/?lang=en_US).

## Development server

- Run `npm install` to download all the dependencies.
- Set DB params of your PG server in [knexfile.js](knexfile.js) as per your local setup.
- Run `npm knex:migrate:latest` for generating the database schema and `node app.js` to run the project.
- HTTPs is enabled but the SSL Certificate is locally signed. So to use postman please go to settings and disable "SSL certificate verification".

## Info

This project deals wiht signing up user, auhtenticating him using cookie auth and then retruning the list of users through an authneticated request.

## Components

 All the major components in this projects are listed below.

## Contents

- User Signup
- User Signin
- Get User List

This documentation will go through the basic introdution about the components and their work around.

## User Signup

 This route adds a database entry for a user after some validations and checks.

- Unique registeration Email
- Passowrd and Email check using Joi
- Hashing and Storing the password using bcrypt.

## User Signin

 This route deals with authenticating a Sign Up request with a Cookie Auth that is a part of HapiJs. It validates the request body and then compares the hash password stored in the Database with the request using Bcrypt.

- Finding user through Email.
- Comparing the passwords using bcrypt
- Returning auth token through cookie.
  
## Get User List

  This route is responsible for retruning the list of all users if there is a valid cookie auth in the request header.

## User Schema

The structure is present in migrations folder inside database folder. generated through Knex.

- Id : User ID is self egnerated UIID.
- Email : Email is stored as a string after Joi email validation.
- Password : Is stored in hash after being converted through [Bcrypt](https://www.npmjs.com/package/bcrypt)
