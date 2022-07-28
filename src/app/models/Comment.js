const con = require('../../config/db');
const utf8 = require('utf8');

//Function to insert comment of the user
function insertComment(objCmt) {
    return new Promise(function (resolve, reject) {
        try {
            let date_ob = new Date();
            var sql = "INSERT INTO northwind.comment (`id_product`,`id_customer`,`comment`,`rate`,`createAt`) VALUES (?) ";

            const cmt = [objCmt.id_Product, objCmt.id_User, objCmt.comment, objCmt.rating, date_ob];

            var stringCv = Buffer.from(objCmt.comment, 'utf-8').toString();

            con.query(sql, [[objCmt.id_Product, objCmt.id_User, objCmt.comment, objCmt.rating, date_ob]], function (err, rows, fields) {
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

//Function to insert comment of the user
function getComment(id_Product) {
    return new Promise(function (resolve, reject) {
        try {
            var sql = "select  c.first_name, c.last_name,c.image_user , p.product_img, cm.comment, cm.rate, cm.createAt"
                + " from comment cm"
                + " join products p on cm.id_product = p.id"
                + " join customers c on cm.id_customer = c.id"
                + " where p.id = ?";

            con.query(sql, id_Product, function (err, rows, fields) {
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
module.exports = { insertComment, getComment };