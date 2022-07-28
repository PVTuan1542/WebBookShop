const express = require('express');
const router = express.Router();

const shopCartController = require('../app/controllers/ShoppingCartController');
const orderCartController = require('../app/controllers/OrderController');


//shopping-cart/

router.get('/order', orderCartController.order);

router.get('/remove/:id', shopCartController.removeCart);

router.get('/add-to-cart/:id', shopCartController.addCart);

router.get('/checkout', shopCartController.checkout);

router.post('/checkout', shopCartController.payment);

router.get('/', shopCartController.index);

module.exports = router;

