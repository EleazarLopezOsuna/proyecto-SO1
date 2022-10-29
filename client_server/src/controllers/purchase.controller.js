'use strict';
const Purchase = require('../models/purchase.model');

exports.create = function(req, res) {
    const new_purchase = new Purchase(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Fields are not complete' });
    }else{
        Purchase.create(new_purchase, function(err, purchase) {
            console.log('a')
            if (err){
                res.send(err);
            }
            res.json({
                error: false,
                message: "Purchase added successfully!",
                data: purchase
            });
        });
    }
};