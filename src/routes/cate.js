const express = require('express');
const router = express.Router();

const cateController = require('../app/controllers/CateController');

router.get('/', cateController.index);

module.exports = router;
