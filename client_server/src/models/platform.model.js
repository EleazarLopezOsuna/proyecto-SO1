'use strict';
const dbConn = require('./../../config/db.config');

let Platform = function(platform){
    this.platformName = platform.platformName;
};

Platform.findAll = function (result) {
    dbConn.query("SELECT * FROM Platform", function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Platform;