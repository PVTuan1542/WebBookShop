const express = require('express');
const router = express.Router();

const detailController = require('../app/controllers/DetailController');

router.post('/comment', detailController.comment);

router.get('/:id', detailController.index);
//router.get('/', detailController.index);

module.exports = router;
