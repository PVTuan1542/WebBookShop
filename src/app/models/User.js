const res = require('express/lib/response');
const con = require('../../config/db');

//Function to get all info of the User
function getUser() {
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
//Function to login into user
function loginUser(user) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM customers WHERE user_name = ?";
        con.query(sql, user, function (err, rows, fields) {
  
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to get data with id
function getIdUser(id) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM customers WHERE id = ?";
        con.query(sql, id, function (err, rows, fields) {
         
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to insert a customers into data customers
function createOneUser(objCustomer) {
    return new Promise(function (resolve, reject) {
        let date_ob = new Date();
        var sql = "INSERT INTO northwind.customers ( `last_name`, `first_name`, `email_address`, `job_title`, `mobile_phone`,`user_name`,`pass_word`, `address`, `city`,`birthday`,`gender`, `createAt`) VALUES ? ";
        var values = [[ objCustomer.last_name, objCustomer.first_name, objCustomer.email_address, objCustomer.job, objCustomer.mobile_phone, objCustomer.user_name, objCustomer.pass_word, objCustomer.address, objCustomer.city, objCustomer.birthday, objCustomer.gender, date_ob]];
        con.query(sql, ([values]), function (err, rows, fields) {
       
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
            resolve(rows);
        });
    });
}

//Function to update a customers into data customers
function updateOneCustomer(objCustomer, userId) {
    return new Promise(function (resolve, reject) {
        let date_ob = new Date();
        var sql = "UPDATE northwind.customers SET  `last_name` = ?, `first_name` = ?, `email_address` = ?, `mobile_phone` = ?,`birthday` = ?, `gender` = ?, `address` = ?, `city` = ?, `updateAt` = ? where id = ?";
        var values = [ [objCustomer.last_name, objCustomer.first_name, objCustomer.email_address,objCustomer.mobile_phone , objCustomer.birthday, objCustomer.gender , objCustomer.address, objCustomer.city, date_ob, userId]];
        con.query(sql,[objCustomer.last_name, objCustomer.first_name, objCustomer.email_address,objCustomer.mobile_phone , objCustomer.birthday, objCustomer.gender , objCustomer.address, objCustomer.city, date_ob, userId], function (err, rows, fields) {
  
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to update a customers into data customers
function updatePassCustomer(objCustomer, userId) {
    return new Promise(function (resolve, reject) {
        let date_ob = new Date();
        var sql = "UPDATE northwind.customers SET `pass_word` = ?, `last_name` = ?, `first_name` = ?, `email_address` = ?, `mobile_phone` = ?,`birthday` = ?, `gender` = ?, `address` = ?, `city` = ?, `updateAt` = ? where id = ?";
        var values = [objCustomer.new_password, objCustomer.last_name, objCustomer.first_name, objCustomer.email_address,objCustomer.mobile_phone , objCustomer.birthday, objCustomer.gender , objCustomer.address, objCustomer.city, date_ob, userId];
        con.query(sql,[objCustomer.new_password, objCustomer.last_name, objCustomer.first_name, objCustomer.email_address,objCustomer.mobile_phone , objCustomer.birthday, objCustomer.gender , objCustomer.address, objCustomer.city, date_ob, userId], function (err, rows, fields) {
            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = { getUser, loginUser, getIdUser, createOneUser, updateOneCustomer, updatePassCustomer };