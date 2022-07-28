const con = require('../../config/db');

//Function to insert Order of the user
function insertInvoice(cart, orderId) {
    return new Promise(function (resolve, reject) {
        try {
            let dateOrder = new Date();
            let shipping = 20000;
            let amount = cart.totalPrice + shipping;
            var sql = "INSERT INTO northwind.invoices (`order_id`, `invoice_date`, `shipping`, `amount_due`) VALUES ?"

            const invoice = [orderId, dateOrder, shipping, amount];

            con.query(sql, [[invoice]], function (err, rows, fields) {
           
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

module.exports = { insertInvoice };