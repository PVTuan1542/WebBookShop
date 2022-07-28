const path = require('path');
const con = require('./config/db');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var flash = require('connect-flash');

const MySQLStore = require('express-mysql-session')(session);

const port = process.env.PORT || 8080;

const route = require('./routes');

const app = express();

//Into img
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

//app.use(express.static('client'));



//using cookies
app.use(cookieParser())
//using session
const sessionStore = new MySQLStore({}, con);

app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 60 * 60 * 10000 * 3 }
}));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// override with POST having ?_method=PUT
app.use(methodOverride('_method'));

//XMLHttpReques, fetch, axios,

//HTTP logger
//app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sub: (a, b) => a - b,
            format: function (money) {
                var formatter = new Intl.NumberFormat('en-US', {
                    currency: 'VND',
                    style: 'currency',
                });
                return formatter.format(money);
            },
            stars: function (item, rate) {
                if (item <= rate) {
                    return "active"
                } else {
                    return "inactive"
                }
                return "active";
            },

        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//app.set('views', path.join(__dirname, '../admin', 'resources','views'));
//Routes init
route(app);


app.listen(port, () => {
    console.log(`Server is running at port : ${port} `);
});
