const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

//router.use('/:slug', siteController.show);

router.get('/search', siteController.search);

router.get('/', siteController.show);

module.exports = router;
