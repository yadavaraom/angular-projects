require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/server/views');
//app.use(express.static("./dist/angularApp"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./server/controllers/login.controller'));
app.use('/register', require('./server/controllers/register.controller'));
app.use('/app', require('./server/controllers/app.controller'));
app.use('/api/users', require('./server/controllers/api/users.controller'));

app.use('/app/api/users', require('./server/controllers/api/users.controller'));


// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// app.post('/app/api/users/register', function (req, res) {
//     console.log("register===>");
// })

module.exports = app;