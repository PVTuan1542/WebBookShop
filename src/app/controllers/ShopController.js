const res = require('express/lib/response');
const Products = require('../models/Products');

class ShopController {
    //[GET] /shop
    index(req, res) {
        //Call the function to get information of the customer
        Products.getProducts().then(function (rows) {
            var data = [];

            //ID page
            var page = 1;

            //Total page
            var totalPage = Math.floor(rows.length / 16);

            var minItem = (page - 1) * 16;

            var maxItem = page * 16;

            if (maxItem > rows.length) {
                maxItem = rows.length;
            }
            //Add 16 item into data
            for (var i = minItem; i < maxItem; i++) {
                data.push(rows[i]);
            }

            //res.json(totalPage);

            res.render('shop/shop', { Products: data, pageNow: parseInt(page), totalPage });
        })
            .catch((err) => { throw err; })

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
            Products.getProductsLimitShop(limitStart, limit).then(function (rows) {
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
                if (3 <= page ) {
                    isAllPage = false;
                }

                var data = {
                    "isTotalPage": isTotalPage,
                    "isNearTotalPage": isNearTotalPage,
                    "totalPage": totalPage,
                    "pageNow": page,
                    "isFour": isFour,
                }
                res.render('shop/shop', { Products: rows, data });
            })
                .catch((err) => { throw err; })
        })

    }

}

module.exports = new ShopController();
