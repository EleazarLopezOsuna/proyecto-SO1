'use strict';
const Product = require('../models/product.model');

exports.findById = function(req, res) {
    Product.findAllById(req.params.id, function(err, product) {
        if (err){
            res.send(err);
        }
        res.send(product);
    });
};