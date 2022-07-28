const express = require('express');
const router = express.Router();

const pageController = require('../app/controllers/PageController');

router.get('/shop/:id', pageController.index);
//router.get('/', detailController.index);

module.exports = router;