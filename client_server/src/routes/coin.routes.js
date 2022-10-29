const express = require('express');
const router = express.Router();
const coinController =   require('../controllers/coin.controller');

router.get('/:id', coinController.findById);
router.put('/:id', coinController.update);
module.exports = router