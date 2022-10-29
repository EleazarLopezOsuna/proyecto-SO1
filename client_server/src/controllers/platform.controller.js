'use strict';
const Platform = require('../models/platform.model');

exports.findAll = function(req, res) {
    Platform.findAll(function(err, platform) {
        if (err){
            res.send(err);
        }
        res.send(platform);
    });
};