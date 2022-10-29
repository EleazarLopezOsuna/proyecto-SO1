'use strict';
const dbConn = require('./../../config/db.config');

let Coin = function(coin){
    this.coinPlatform = coin.coinPlatform;
    this.coinBalance = coin.coinBalance;
};

Coin.findById = function (id, result) {
    dbConn.query("SELECT c.coinId, p.platformName, c.coinBalance FROM Coin c, Platform p WHERE c.coinPlatform = ? and p.platformId = c.coinPlatform", id, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Coin.update = function(id, coinBalance, result){
    dbConn.query("UPDATE Coin SET coinBalance = ? WHERE coinId = ?", [coinBalance, id], function (err, res) {
        if(err) {
            result(null, err);
        }else{
            result(null, res);
        }
    });
};

module.exports = Coin;