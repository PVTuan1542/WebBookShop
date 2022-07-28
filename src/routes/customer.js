const express = require('express');
const router = express.Router();

const customersController = require('../app/controllers/CustomersController');

router.get('/create', customersController.create);

router.post('/register', customersController.register);

router.post('/handle-form-actions', customersController.handleFormActions);

router.get('/:id/edit', customersController.edit);

router.put('/:id', customersController.update);

router.delete('/:id', customersController.destroy);

router.get('/:slug', customersController.show);

module.exports = router;
