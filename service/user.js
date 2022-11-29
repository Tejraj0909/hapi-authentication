'use strict';
const DB  = require('../database/db');
const bcrypt = require('bcrypt')

exports.signUpUser = async function (userData) {
	 const result = await DB('users').insert(userData);
     return result
};

 exports.findFilterUser= async function (filter) {
	const result =  await DB('users').where( filter ).first();
    return result
}
exports.findAllUsers = async function (filter) {
     const result = await DB('users').select('email','id')
     return result
    }
 exports.encryptString = function (string) {
    return bcrypt.hashSync(string, 10);
 }
