const res = require('express/lib/response');

class PageController {
    //[GET] /blog
    index(req, res) {
        res.render('blog/blog');
    }

    // [GET] /blog/:slug
    show(req, res) {
        res.send('News detail !!!');
    }
}

module.exports = new PageController();
