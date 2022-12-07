'use strict';
require('dotenv').config();
const mysql = require('mysql');

const pool = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports =  pool;