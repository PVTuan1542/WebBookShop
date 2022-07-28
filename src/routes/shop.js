const express = require('express');
const router = express.Router();

const shopController = require('../app/controllers/ShopController');

router.get('/', shopController.show);

module.exports = router;
