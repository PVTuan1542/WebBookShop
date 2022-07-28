const con = require('../../config/db');

//Function to get all info of the products
function getProducts() {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM products";
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
//Function to get all info of the products
function getCateProducts() {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM products where id_cate = 137";
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get a Product info  where id = ?
function getOneProducts(id) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT p.id, p.product_name, p.product_img, p.list_price, p.fake_price, p.quantity_per_unit, p.author, c.name_cate FROM products p"
        +" join categorys c on c.id = p.id_cate where p.id = ?";
        con.query(sql, id, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get 16 Product info  limit = start, end ?
function getProductsLimit(start, end) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM products LIMIT ?";
        con.query(sql, [[start, end]], function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get 16 Product info  limit = start, end ?
function getProductsLimitShop(start, end) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM products order by product_code desc LIMIT ?";
        con.query(sql, [[start, end]], function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get 16 Product info  limit = start, end ?
function getCountProductst() {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT count(id) as count FROM products ";
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to count total products in search
function getCountSearch(txt) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT count(id) as countSearch FROM northwind.products"
            + " where product_name like ? ";
        var txtSearch = "%" + txt + "%";
        con.query(sql, txtSearch, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get 16 search Product info  limit = start, end ?
function getSearchProductsLimit(start, end, txt) {
    return new Promise(function (resolve, reject) {
        var txtSearch = "%" + txt + "%";
        var sql = "SELECT * FROM northwind.products"
            + " where product_name like ? limit ?";
        var limit = [start, end];
        con.query(sql, [txtSearch, limit], function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}





module.exports = {getProductsLimitShop, getProducts, getOneProducts, getCateProducts, getProductsLimit, getCountProductst, getCountSearch, getSearchProductsLimit };

