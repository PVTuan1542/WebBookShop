
try {
    var mysql = require('mysql');
    // var con = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "tuan1542",//tuan1542
    //     database: "northwind",
    //     charset: 'utf8mb4'
    // });

    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'tuan1542',
        database: 'northwind',
        connectionLimit: 50,
        queueLimit: 0,
    });

    // con.connect(function (err) {
    //     if (err) throw err;
    //     var sql = "SELECT * FROM customers";
    //     con.query(sql, function (err, results) {
    //         if (err) throw err;
    //         console.log(results);
    //     })
    // });


} catch (error) {
    console.log("Connection failure !!!");
}




module.exports = pool;
