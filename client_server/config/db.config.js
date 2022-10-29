'use strict';
const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host     : 'db',
    user     : 'root',
    password : 'root',
    database : 'operative_systems',
    port     : '3307'
});

dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = dbConn;