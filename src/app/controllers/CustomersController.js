const res = require('express/lib/response');
const Customers = require('../models/Customers');
const lodash = require('lodash');
const { sqlToObject } = require('../../util/mysql')
class CustomersController {
    // [GET] /profile/:slug
    show(req, res) {
        //Call the function to get information of the customer
        Customers.getCustomers().then(function (rows) {
            var detail = lodash.filter(rows, x => x.last_name === req.params.slug);
            var data = detail[0];
            res.render('customers/show', { Detail: data });

        })
            .catch((err) => { throw err; })
    }

    //[GET] /customers/createCustomer
    create(req, res, next) {
        //Call getTotalIdCustomers in model/customers
        Customers.getTotalIdCustomers().then(function (rows) {

            const data = rows[0];
            //Loop data after plus id + 1
            // Object.keys(data).forEach(key => {
            //     data[key] = data[key] + 1;
            // });

            res.render('customers/createCustomer', { data: data });
        })
            .catch((err) => { throw err; })

    }

    //[GET] /customers/id/edit
    edit(req, res, next) {
        //Call getTotalIdCustomers in model/customers
        Customers.getCustomers()
            .then(function (rows) {
                var detail = lodash.filter(rows, x => x.id == req.params.id);
                var data = detail[0];
                //res.json(data);
                res.render('customers/editCustomer', { customer: data });
            })
            .catch(next)

    }

    //[PUT] /customers/:id
    update(req, res, next) {
        let userName = req.body.user_name.replace(/\s/g, '');
        let passWord = req.body.pass_word.replace(/\s/g, '');
        if (userName != "" && passWord != "") {
            Customers.updateOneCustomers(req.body)
                .then(() => res.redirect('/me/stored/list-customers'))
                .catch((err) => { throw err; })
        } else {
            res.send("ERROR!!!");
        }
        //res.json(req.body);
    }

    //[DELETE] /customers/:id
    destroy(req, res, next) {
        Customers.deleteOneCustomers(req.params.id)
            .then(() => res.redirect('back'))
            .catch(next);
        //res.send(req.params.id);
    }

    //[POST] /customers/register
    register(req, res, next) {
        let userName = req.body.user_name.replace(/\s/g, '');
        let passWord = req.body.pass_word.replace(/\s/g, '');

        if (userName != "" && passWord != "") {
            Customers.insertOneCustomers(req.body)
                .then(() => res.redirect('/'))
                .catch((err) => { throw err; })
        } else {
            res.send("ERROR!!!");
        }
    }

    //[POST] /customers/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':

                var listDelete = req.body['customerIds'];
                Customers.deleteMutipleCustomers(listDelete)
                    .then(() => res.redirect('back'))
                    .catch(next);

                break;

            default:
                res.json({ message: 'Action is invaid' });
        }

    }
}

module.exports = new CustomersController();
