'use strict';
const Coin = require('../models/coin.model');

exports.findById = function(req, res) {
    Coin.findById(req.params.id, function(err, coin) {
        if (err){
            res.send(err);
        }
        res.json(coin);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide a new balance for the coin' });
    }else{
        Coin.update(req.params.id, req.body.coinBalance, function(err) {
            if (err){
                res.send(err);
            }
            res.json({
                error: false,
                message: 'Coin successfully updated'
            });
        });
    }
};