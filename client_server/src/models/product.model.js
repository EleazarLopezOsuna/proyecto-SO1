'use strict';
const dbConn = require('./../../config/db.config');

let Product = function(product){
    this.productPlatform = product.productPlatform;
    this.productName = product.productName;
    this.productPrice = product.productPrice;
};

Product.findAllById = function (id, result) {
    dbConn.query("SELECT pr.productId, pl.platformName, pr.productName, pr.productPrice, pl.platformId FROM Product pr, Platform pl WHERE pr.productPlatform != ? and pr.productPlatform = pl.platformId", id, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Product;