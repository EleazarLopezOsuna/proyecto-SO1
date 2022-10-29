const express = require('express');
const router = express.Router();
const platformController =   require('../controllers/platform.controller');

router.get('/', platformController.findAll);
module.exports = router