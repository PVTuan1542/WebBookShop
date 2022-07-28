const res = require('express/lib/response');

class ContactController {
    //[GET] /news
    index(req, res) {
        res.render('contact/contact');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('News detail !!!');
    }
}

module.exports = new ContactController();
