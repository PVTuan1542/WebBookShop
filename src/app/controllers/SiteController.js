const res = require('express/lib/response');
const Products = require('../models/Products');
const con = require('../../config/db');
//console.log(customers);
class SiteController {
    //[GET] /site

    //[GET] /home
    index(req, res) {
        //Call the function to get information of the customer
        Products.getCateProducts().then(function (rows) {
            //res.json(rows)
            res.render('home', { Products: rows });
        })
            .catch((err) => { throw err; })

    }

    // [post] /home/search
    search(req, res) {
        let txtSearch = req.query.txtSearch;
        var page = parseInt(req.query.page) || 1;
        var limit = parseInt(req.query.limit) || 16;
        //Start index products in sql 
        var limitStart = (page - 1) * limit;

        //If 
        var isFour = true;

        if (page <= 3) {
            isFour = false;
        }

        Products.getCountSearch(txtSearch).then(function (rows) {
            var count = rows[0].countSearch;
            Products.getSearchProductsLimit(limitStart, limit, txtSearch).then(function (rows) {
                var totalPage = Math.ceil(count / limit);
                var isNearTotalPage = true;
                var isTotalPage = true;
                var isAllPage = true;
                var isOnePage = true;

                if (totalPage == 1) {
                    isOnePage = false;
                }

                if (totalPage - 1 <= page) {
                    isNearTotalPage = false;
                }
                if (totalPage == page) {
                    isTotalPage = false;
                }
                if (3 <= page) {
                    isAllPage = false;
                }

                var data = {
                    "isTotalPage": isTotalPage,
                    "isNearTotalPage": isNearTotalPage,
                    "totalPage": totalPage,
                    "pageNow": page,
                    "isFour": isFour,
                    "isOnePage": isOnePage
                }
                res.render('search', { Products: rows, data, txtSearch });
                //res.json(rows);

            })
                .catch((err) => { throw err; })
            //res.render('home', { Products: rows });
        })
            .catch((err) => { throw err; })
        //res.render('search');
    }

    // [GET] /shop/:slug
    show(req, res) {

        //ID page
        var page = parseInt(req.query.page) || 1;
        var limit = parseInt(req.query.limit) || 16;

        //Start index products in sql 
        var limitStart = (page - 1) * limit;
        //If 
        var isFour = true;

        if (page <= 3) {
            isFour = false;
        }
        Products.getCountProductst().then(function (row) {
            var count = row[0].count;
            Products.getProductsLimit(limitStart, limit).then(function (rows) {
                var totalPage = Math.ceil(count / limit);
                var isNearTotalPage = true;
                var isTotalPage = true;
                var isAllPage = true;

                if (totalPage - 1 <= page) {
                    isNearTotalPage = false;
                }
                if (totalPage == page) {
                    isTotalPage = false;
                }
                if (3 <= page) {
                    isAllPage = false;
                }

                var data = {
                    "isTotalPage": isTotalPage,
                    "isNearTotalPage": isNearTotalPage,
                    "totalPage": totalPage,
                    "pageNow": page,
                    "isFour": isFour,
                }
                res.render('home', { Products: rows, data });
            })
                .catch((err) => { throw err; })
        })
    }
}

module.exports = new SiteController();
