const res = require('express/lib/response');
const Customers = require('../models/Customers');
class MeController {

    // [GET] /me/stored/customers
    storedCustomers(req, res, next) {
        //Call the function to get information of the customer
        Customers.getCustomers().then(function (rows) {
            //res.json(rows);
            res.render('me/stored-customers', {
                Customers: rows,
            });
        })
            .catch(next);

    }
}

module.exports = new MeController();
