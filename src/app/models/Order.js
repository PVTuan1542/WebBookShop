const con = require('../../config/db');

//Function to get a order info  where constomer_id = ?
function getOrder(userId) {
    return new Promise(function (resolve, reject) {
        var sql = "select o.id as orderId, od.id as orderDetailId, pd.product_name, pd.product_img, od.unit_price, od.quantity, od.unit_price * od.quantity as total, os.status_name as status_name" +
            " from order_details od" +
            " join orders o on od.order_id = o.id" +
            " join products pd on od.product_id = pd.id" +
            " join orders_status os on os.id = o.status_id" +
            " where o.customer_id = ? "

        con.query(sql, [[userId]], function (err, rows, fields) {

            if (err) {
                return reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//Function to insert Order of the user
function insertOrder(user, cart, typePayment) {
    return new Promise(function (resolve, reject) {
        try {
            let dateOrder = new Date();
            var sql = "INSERT INTO northwind.orders(`customer_id`, `order_date`, `payment_type`, `status_id`) VALUES ? ";

            const order = [user.id, dateOrder, typePayment, 0];

            con.query(sql, [[order]], function (err, rows, fields) {
   
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
function insertOrderDetail(products, orderId) {
    return new Promise(function (resolve, reject) {
        try {
            let dateOrder = new Date();
            var sql = "INSERT INTO northwind.order_details (`order_id`,`product_id`, `quantity`, `unit_price`, `status_id` ) VALUES ? ";
            const orders = [];

            //Push order into orders(array)
            for (const key in products.items) {

                const productId = products.items[key].item.id;
                const quantity = products.items[key].qty;
                const price = products.items[key].list_price;

                const order = [orderId, productId, quantity, price, 0];

                orders.push(order);
            }
            console.log(orders);

            con.query(sql, [orders], function (err, rows, fields) {
      
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



//BEGIN;
// INSERT INTO northwind.orders (`customer_id`,`order_date`, `payment_type`, `status_id` ) VALUES ? ;
// INSERT INTO northwind.order_details (`order_id`,`product_id`, `quantity`, `unit_price`, `stattus_id` ) VALUES ? ;
// INSERT INTO northwind.invoices (`order_id`,`invoice_date`, `shipping`, `amount_due` ) VALUES ? ;
// COMMIT;

// let dateOrder = new Date();
//[user.id, dateOrder, "Check", 0]
//[`Lấy ở trên`, `cart.items.item.product_id`, `cart.items.qty`, `cart.items.list_price`] 3 products -> 3 detail_order => 3 insert
// [`Lấy ở trên`,`dateOrder`,`20000`, `cart.totalPrice + 20000`]


// "START TRANSACTION;"
//     + "INSERT INTO northwind.orders(`customer_id`, `order_date`, `payment_type`, `status_id`) VALUES('1', '2006-01-22 00:00:00', 'Check', '0');"
//     + "INSERT INTO northwind.invoices(`order_id`, `invoice_date`, `shipping`, `amount_due`) VALUES('84', '2006-01-22 00:00:00', '20000', '60000');"
//     + "INSERT INTO northwind.order_details(`order_id`, `product_id`, `quantity`, `unit_price`, `status_id`) VALUES('84', '6', '12', '10000', '0');"
//     + "COMMIT;";

module.exports = { insertOrder, insertOrderDetail, getOrder };

