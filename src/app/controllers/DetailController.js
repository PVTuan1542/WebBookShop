const res = require('express/lib/response');
const Products = require('../models/Products');
const Comment = require('../models/Comment');

const lodash = require('lodash');
const { response } = require('express');

class DetailController {
    //[GET] /shop
    index(req, res) {
        var isComment = true;
        var idP = req.params.id;
        Products.getOneProducts(idP).then(function (rows) {
            var data = rows[0];

            Comment.getComment(idP).then(function (rows) {
                if (!rows[0]) {
                    isComment = false;
                }

                res.render('detail/detail', { Detail: data, Comment: rows, isComment });
            })
                .catch((err) => { throw err; })

        })
            .catch((err) => { throw err; })
    }

    // [post] /detail/comment
    comment(req, res) {
        if (req.body.id_User == "") {
            res.redirect("/");
            return;
        }
        let comment = req.body;
        Comment.insertComment(comment).then(function (rows) {
            //res.json(comment);
            res.redirect("/detail/" + comment.id_Product);
            //res.render('detail/detail', { Detail: data });
        })
            .catch((err) => { throw err; })
    }
}

module.exports = new DetailController();
