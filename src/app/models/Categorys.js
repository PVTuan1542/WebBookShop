const con = require('../../config/db');

//Function to insert Order of the user
function getCate(start, end, cateId) {
    return new Promise(function (resolve, reject) {
        try {
            let dateOrder = new Date();
            var sql = "SELECT p.id, p.product_name, p.product_img, p.list_price, p.fake_price, p.quantity_per_unit, p.author, c.name_cate FROM northwind.products p"
                + " join northwind.categorys c on c.id = p.id_cate"
                + " where p.id_cate = ? limit ?;"

            var limit = [start, end];

            con.query(sql, [cateId, limit], function (err, rows, fields) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(rows);
                }
            });
        } catch (error) {
            console.error(error);
        }

    });
}

//Function to insert Order of the user
function getCountCate(cateId) {
    return new Promise(function (resolve, reject) {
        try {
            var sql = "SELECT count(p.id) as countCate FROM northwind.products p"
                + " join northwind.categorys c on c.id = p.id_cate"
                + " where p.id_cate = ? ;"
            con.query(sql, cateId, function (err, rows, fields) {
                if (err) {
                    return reject(err);
                } else {
                    resolve(rows);
                }
            });
        } catch (error) {
            console.error(error);
        }

    });
}

module.exports = { getCate, getCountCate };