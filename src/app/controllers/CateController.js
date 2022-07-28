const res = require('express/lib/response');

const Cate = require('../models/Categorys');

class CateController {
    //[GET] /categorys
    index(req, res) {
        var cateId = req.query.cate;

        var page = parseInt(req.query.page) || 1;
        var limit = parseInt(req.query.limit) || 16;
        //Start index products in sql 
        var limitStart = (page - 1) * limit;

        //If 
        var isFour = true;

        if (page <= 3) {
            isFour = false;
        }

        Cate.getCountCate(cateId).then(function (rows) {
            var count = rows[0].countCate;
            

            Cate.getCate(limitStart, limit, cateId).then(function (rows) {
                var totalPage = Math.ceil(count / limit);
                var isNearTotalPage = true;
                var isTotalPage = true;
                var isAllPage = true;
                var isOnePage = true;
                var titleCate = rows[0].name_cate;

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
                res.render('cate/cate', { Products: rows, data, titleCate, cateId });
                //res.json(rows);
                
            })
                .catch((err) => { throw err; })
            //res.render('home', { Products: rows });
        })
            .catch((err) => { throw err; })
    }

    // [GET] /blog/:slug
    show(req, res) {
        res.send('News detail !!!');
    }
}

module.exports = new CateController();
