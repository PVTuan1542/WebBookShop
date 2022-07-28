const res = require('express/lib/response');
const Products = require('../models/Products');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Invoice = require('../models/Invoices');
const { readProfile } = require('./UserController');

class ShoppingCartController {
    //[GET] /shopping-cart
    index(req, res) {
        if (!req.session.cart) {
            return res.render('shopping-cart/shopping-cart', { products: null });
        }
        var cart = new Cart(req.session.cart);
        res.render('shopping-cart/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice, });
    }

    // [GET] /shopping-cart/add-to-cart/:id
    addCart(req, res) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});

        Products.getOneProducts(productId).then(function (rows) {
            const product = rows[0];
            cart.add(product, productId);
            req.session.cart = cart;
            //console.log(req.session.cart);
            res.redirect('/shop');
            //res.json(cart);
            //res.render('customers/createCustomer', { data: data });
        })
            .catch((err) => { throw err; })
    }

    //[GET] /shopping-cart/remove/:id
    removeCart(req, res) {
        const productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});

        cart.remove(productId);
        req.session.cart = cart;
        //res.json(cart)
        res.redirect('/shopping-cart');
    }
    //[GET] /shopping-cart/checkout
    checkout(req, res) {
        if (!req.session.cart) {
            return res.redirect('/shopping-cart');
        }
        var errMsg = req.flash('error')[0];
        var cart = new Cart(req.session.cart);
        res.render('shopping-cart/checkout', { layout: false, total: cart.totalPrice, errMsg, noError: !errMsg });
    }

    //[POST] /shopping-cart/checkout
    payment(req, res, next) {
        if (!req.session.cart) {
            return res.redirect('/shopping-cart');
        }
        var cart = new Cart(req.session.cart);
        var stripe = require("stripe")("sk_test_51LDmVuGXrgRUCCVo9WHb39HsHQHuLAtFwS9ItdtiKQcZI8DpNsKpLVFFOQLlOT2brFw9oxBVffsUWJW9FI9kBnWh00wpMnK5Mb");
        stripe.charges.create({
            amount: cart.totalPrice,
            currency: "vnd",
            source: "tok_mastercard",
            description: "Example",
        }, function (err, charge) {
            if (err) {
                req.flash('error', err.message);
                return res.redirect("/shopping-cart/checkout");
            }
            req.flash('success', 'Successfully bought product!');

            if (!req.session.cart) {
                res.render('home');
                return;
            }
            if (!req.session.userSession) {
                res.redirect('/user/login');
                return;
            }

            let user = req.session.userSession;
            let cart = req.session.cart;
            let typePayment = "Thanh toán online";

            //Call the function to insert of the order and the order_detail and invoices
            Order.insertOrder(user, cart, typePayment)
                .then(function (rows) {

                    let orderId = rows.insertId
                    //Insert data into table Invoices
                    Invoice.insertInvoice(cart, orderId)
                        .then(function (rows) {
                            if (!rows) {
                                res.send("ERROR!");
                                return;
                            }
                            //Insert data into table order_details
                            Order.insertOrderDetail(cart, orderId)
                                .then(function (rows) {
                                    if (!rows) {
                                        next;
                                        return;
                                    }
                                    req.session.cart = null;
                                    res.render('shopping-cart/success');
                                })
                                .catch(next);
                        })
                        .catch(next);

                })
                .catch((err) => { throw err; })
            //req.session.cart = null;
            //res.redirect('/shopping-cart');
        });
    };
}



module.exports = new ShoppingCartController();
