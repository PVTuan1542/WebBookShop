module.exports = function Cart(oldCart) {

    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, list_price: 0 };
        }
        storedItem.qty++;
        storedItem.list_price = storedItem.item.list_price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.list_price;
    };

    this.remove = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].list_price * this.items[id].qty;
        delete this.items[id];
    };

    this.generateArray = function () {
        const arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}