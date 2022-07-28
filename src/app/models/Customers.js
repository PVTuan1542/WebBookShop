const con = require('../../config/db');
// module.exports.customers = function (data, callback) {
//     var sql = "SELECT * FROM customers";
//     con.query(sql, callback, function (err, results) {
//         if (err) throw err;
//         callback(null, results);
//     })
// }

//Function to get all info of the customers
function getCustomers() {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM customers";
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get total id customers
function getTotalIdCustomers() {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT COUNT(id) as totalId FROM customers";
        con.query(sql, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get a customers info  where last_name = ?
function getOneCustomers(last_name) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM customers where last_name = ?";
        con.query(sql, last_name, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
//Function to insert a customers into data customers
function insertOneCustomers(objCustomer) {
    return new Promise(function (resolve, reject) {
        let date_ob = new Date();
        var sql = "INSERT INTO northwind.customers ( `company`, `last_name`, `first_name`, `email_address`, `job_title`, `mobile_phone`,`user_name`,`pass_word`, `address`, `city`, `createAt`) VALUES ? ";
        var values = [[objCustomer.company, objCustomer.last_name, objCustomer.first_name, objCustomer.email, objCustomer.job, objCustomer.phone, objCustomer.user_name, objCustomer.pass_word, objCustomer.address, objCustomer.city, date_ob]];
        con.query(sql, ([values]), function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to update a customers into data customers
function updateOneCustomers(objCustomer) {
    return new Promise(function (resolve, reject) {
        let date_ob = new Date();
        var sql = "UPDATE northwind.customers SET `company` = ?, `last_name` = ?, `first_name` = ?, `email_address` = ?, `job_title` = ?, `mobile_phone` = ?,`user_name` = ?,`pass_word` = ?, `address` = ?, `city` = ?, `updateAt` = ? where id = ?";
        var values = [objCustomer.company, objCustomer.last_name, objCustomer.first_name, objCustomer.email_address, objCustomer.job_title, objCustomer.mobile_phone, objCustomer.user_name, objCustomer.pass_word, objCustomer.address, objCustomer.city, objCustomer.id];
        con.query(sql,[objCustomer.company, objCustomer.last_name, objCustomer.first_name, objCustomer.email_address, objCustomer.job_title, objCustomer.mobile_phone, objCustomer.user_name, objCustomer.pass_word, objCustomer.address, objCustomer.city, date_ob, objCustomer.id], function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to delete a customers into data customers
function deleteOneCustomers(id) {
    return new Promise(function (resolve, reject) {
        var sql = "DELETE FROM `northwind`.`customers` WHERE (`id` = ?);";
        con.query(sql,id, function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to delete mutiple customers into data customers
function deleteMutipleCustomers(listId) {
    return new Promise(function (resolve, reject) {
        var sql = "DELETE FROM `northwind`.`customers` WHERE `id` IN (?);";
        con.query(sql,[listId], function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}


module.exports = { getCustomers, getOneCustomers, insertOneCustomers, getTotalIdCustomers, updateOneCustomers, deleteOneCustomers, deleteMutipleCustomers };