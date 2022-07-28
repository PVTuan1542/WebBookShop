const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const orderController = require('../app/controllers/OrderController');

router.get('/ordered', orderController.ordered);

router.post('/create', userController.create);

router.put('/edit', userController.editProfile);

router.get('/profile', userController.readProfile);

router.get('/register', userController.register);

router.get('/logout', userController.logout);

router.get('/login', userController.login);

router.post('/login', userController.login);

router.get('/', userController.login);
//router.get('/', detailController.index);

module.exports = router;
