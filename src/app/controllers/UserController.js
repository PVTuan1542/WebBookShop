const res = require('express/lib/response');
const User = require('../models/User');

class UserController {
    //[GET] /user/login
    login(req, res) {

        if (req.method === 'GET') {
            res.render('user/login', { layout: false });
        }
        if (req.method === 'POST') {
            let userName = req.body.user_name.replace(/\s/g, '');
            let passWord = req.body.pass_word.replace(/\s/g, '');

            if (userName != "" && passWord != "") {
                User.loginUser(userName)
                    .then(function (rows) {
                        if (rows.length < 1) {
                            //Send data to login form when does not exist user_name
                            var log = {
                                classLog: "alert alert-danger alert-dismissible fade show",
                                string: "Error! Tài khoản không tồn tại"
                            }
                            res.render('user/login', { layout: false, errors: log, values: req.body });
                        } else {

                            //Loop data(query user_admin) and check password true -> return home
                            for (var row of rows) {
                                if (row.pass_word === passWord) {
                                    req.session.userSession = row;
                                    res.redirect('/home');
                                    //res.locals.login = true;
                                    return;
                                }
                            }
                            //Send data to login form when does not exist pass_word
                            var log = {
                                classLog: "alert alert-danger alert-dismissible fade show",
                                string: "Error! Sai mật khẩu"
                            }
                            res.render('user/login', { layout: false, errors: log, values: req.body });
                        }

                    })
                    .catch((err) => { throw err; })
            } else {
                res.send("ERROR!!!");
            }
        }
    }

    //[GET] /User/logout
    logout(req, res) {
        req.session.userSession = null;
        res.redirect('/home');
    }

    //[GET] /user/register
    register(req, res) {
        req.session.userSession = null;
        res.render('user/register', { layout: false });
    }

    //[POST] /user/create
    create(req, res, next) {
        let userName = req.body.user_name.replace(/\s/g, '');
        let passWord = req.body.pass_word.replace(/\s/g, '');
        //res.json(req.body);
        if (userName != "" && passWord != "") {
            User.createOneUser(req.body)
                .then(() => res.redirect('/user/login'))
                .catch((err) => { throw err; })
        } else {
            res.send("ERROR!!!");
        }
    }

    //[POST] /user/profile
    readProfile(req, res, next) {
        //res.render('user/profile');
        var idUser = req.session.userSession.id;
        User.getIdUser(idUser)
            .then(function (rows) {
                //res.json(rows)
                res.render('user/profile', { user: rows[0] });
            })
            .catch((err) => { throw err; })
    }

    //[PUT] /user/edit
    editProfile(req, res, next) {

        var idUser = req.session.userSession.id;
        var user = req.body;
        var new_password = user.new_password.replace(/\s/g, '');
        var re_new_password = user.re_new_password.replace(/\s/g, '');

        // var pass = req.body.pass_word
        if (user.pass_word == "") {

            User.updateOneCustomer(user, idUser)
                .then(function (rows) {
                    res.redirect('/user/profile');
                })
                .catch((err) => { throw err; })

        } else {

            if (new_password != "" && new_password === re_new_password) {
                //res.json(new_password)
                User.updatePassCustomer(req.body, idUser)
                    .then(function (rows) {
                        res.redirect('/user/profile');
                    })
                    .catch((err) => { throw err; })

            } else {

                //Send data to login form when does not exist pass_word
                var log = {
                    classLog: "alert alert-danger alert-dismissible fade show",
                    string: "Error! Nhập lại mật khẩu mới"
                }
                res.render('user/profile', { user: req.session.userSession, error: log });

            }

        }

        //res.json(req.body)
    }

}

module.exports = new UserController();
