var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var user = require('./lib/routes/user');
var path = require('path');

var app = express();

require('./lib/config/setup')(app);

app.use(cookieParser())
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(methodOverride());
app.use(express.static(__dirname + '/app/views'));
app.use(express.static('./srv'));
app.use('/js/',express.static(__dirname + '/bower_components'));
//app.use(express.static(path.join(__dirname, 'srv')));
//app.set('public', path.join(__dirname, 'srv'));
/*
http://stackoverflow.com/questions/13222252/how-to-use-angularjs-routes-with-express-node-js-when-a-new-page-is-requested
http://stackoverflow.com/questions/30546524/making-angular-routes-work-with-express-routes
http://stackoverflow.com/questions/18214835/angularjs-how-to-enable-locationprovider-html5mode-with-deeplinking
*/
app.use("/api/user", user);
app.get(function(req, res) {
	res.sendFile(__dirname + '/app/views/index.html');
});

app.listen(app.get('port'), function() {
	process.env.NODE_ENV = app.get('env');
	console.log("Running in " + process.env.NODE_ENV + " mode");
	console.log("Listening on localhost:" + app.get('port'));
})