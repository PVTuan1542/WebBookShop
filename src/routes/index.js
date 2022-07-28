const newsRouter = require('./news');
const shopRouter = require('./shop');
const cateRouter = require('./cate');
const blogRouter = require('./blog');
const coctactRouter = require('./contact');
const detailRouter = require('./detail');
const shoppingCartRouter = require('./shopping-cart');
const siteRouter = require('./site');
const customerRouter = require('./customer');
const userRouter = require('./user');
const meRouter = require('./me');

const userMiddleware = require('../app/middlewares/user.midleware')

function route(app) {

    app.use(function (req, res, next) {
        if (req.session.userSession) {
            res.locals.user = req.session.userSession;
        }
        if (req.session) {
            res.locals.session = req.session;
        }
        next();
    });

    app.use('/news', newsRouter);
    app.use('/shop', shopRouter);
    app.use('/categorys', cateRouter);
    app.use('/blog', blogRouter);
    app.use('/contact', coctactRouter);
    app.use('/detail', detailRouter);
    app.use('/shopping-cart', shoppingCartRouter);
    app.use('/me', meRouter);
    app.use('/customers', customerRouter);
    app.use('/user', userRouter);
    app.use('/home', siteRouter);

    app.use('/', userRouter);

    //app.use('/customers', customers);
}
module.exports = route;
