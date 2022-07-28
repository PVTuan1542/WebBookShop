const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/list-customers', meController.storedCustomers);

module.exports = router;
