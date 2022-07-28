const { cookie } = require('express/lib/response');
const res = require('express/lib/response');
const Order = require('../models/Order');
const Invoice = require('../models/Invoices');

class OrderController {
    //[GET] /Order
    order(req, res, next) {
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
        let typePayment = "Thanh toán khi giao hàng";

        //Call the function to insert of the order and the order_detail anh invoices
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
    }
    // [GET] /User/ordered
    ordered(req, res, next) {
        if (!req.session.userSession) {
            res.redirect('/');
            return;
        }
        let user = req.session.userSession;
        //res.json(user.id);
        //Call getOrder in model/Order
        Order.getOrder(user.id).then(function (rows) {
            var sum = 0;
            //res.json(rows);
            for (const item of rows) {
                sum = sum + item.total;
            }
            res.render('user/order', { ordered: rows, totalOrder: sum });
        })
            .catch(next);
    }
}

module.exports = new OrderController();
