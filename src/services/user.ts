'use strict';
import DB from '../database/db'
import bcrypt from 'bcrypt'

const signUpUser = async function (userData : object) {
   const result = await DB('users').insert(userData);
   return result
};

const findFilterUser = async function (filter : object) {
   const result = await DB('users').where(filter).first();
   return result
}
const findAllUsers = async function () {
   const result  = await DB('users').select('email', 'id')
   return result
}
const encryptString = function (string : string) {
   return bcrypt.hashSync(string, 10);
}

export = {signUpUser, findAllUsers, findFilterUser, encryptString}