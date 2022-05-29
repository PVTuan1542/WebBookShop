const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require ('express-handlebars');
const port = 3000;

const app = express();

//Into img
app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
//app.use(morgan('combined'));



//Template engine
app.engine('hbs', engine({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views')); 
app.get('/',  (req, res) => {
  res.render('home');
});

app.get('/news',  (req, res) => {
  console.log(req.query);
  res.render('news');
});

app.listen(3000, function(){
  console.log("info",'Server is running at port : ' + 3000);
});