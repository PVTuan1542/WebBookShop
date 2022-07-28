const res = require('express/lib/response');

class BlogController {
    //[GET] /blog
    index(req, res) {
        res.render('blog/blog');
    }

    // [GET] /blog/:slug
    show(req, res) {
        res.send('News detail !!!');
    }
}

module.exports = new BlogController();
