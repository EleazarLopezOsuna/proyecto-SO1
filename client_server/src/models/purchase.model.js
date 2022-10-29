'use strict';
const dbConn = require('./../../config/db.config');

let Purchase = function(purchase){
    this.purchaseOriginPlatform = purchase.purchaseOriginPlatform;
    this.purchaseDestinyPlatform = purchase.purchaseDestinyPlatform;
    this.purchaseCoinId = purchase.purchaseCoinId;
    this.purchaseProduct = purchase.purchaseProduct;
    this.purchaseQuantity = purchase.purchaseQuantity;
};

Purchase.create = function (newPurchase, result) {
    dbConn.query("INSERT INTO Purchase set ?", newPurchase, function (err, res) {
        if(err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    })
};

module.exports = Purchase;