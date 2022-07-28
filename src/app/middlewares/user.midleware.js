const User = require('../models/User');

module.exports.requireUser = function (req, res, next) {
    if (!req.cookies.userId) {
        res.redirect('/user/login');
        return;
    }

    User.getIdUser(req.cookies.userId)
        .then(function (rows) {
            if (rows.length < 1) {
                res.redirect('/user/login');
                return;
            } else {
                next();
            }

        })
        .catch((err) => { throw err; })
};