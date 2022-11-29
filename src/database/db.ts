'use strict';

const environment : string = 'development';
import config from '../knexfile';
const cfg = config[environment]
import knex from 'knex'
const DB = knex(config)
export = DB;