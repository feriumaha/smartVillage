var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var http = require('http').createServer(app);
var session = require('express-session');
var path = require('path');
var db = require('./database.js');
const packageJson = require('./package.json');
const appVersion = packageJson.version;

//Express Session 
app.use(session({
    secret: 'Nodemon',
    resave: false,
    saveUninitialized: true,
    cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false
  },
}));
//END Express Session 

app.use("/public", express.static('views/public'))
app.use("/",express.static('views'))

//ROUTES

//END ROUTES

//EJS
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(function(req, res, next) {
  console.log('' + req.url, "@", Date().toLocaleString(), "from", req.socket.remoteAddress, 'as', req.session.userid);
next();
});

//BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
  parameterLimit: 100000,
  limit: '50mb',
}));

app.get('/', function(req, res){
  res.redirect('login');
});

app.get('/login', function(req, res){
  res.render('login', {layout: 'login.ejs', version: appVersion});
});


app.use(function(req, res, next){
    res.status(404).render('404', { layout: '404.ejs' });
  });
  
  app.listen(9999, () => {
      console.log('App running at http://localhost:9999/')
  });  