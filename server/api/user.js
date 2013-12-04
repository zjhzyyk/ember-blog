var sanitize = require('validator').sanitize;
var User = require("../model/user");
var timeout = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days

var isAuth = function(req, res){
	if (req.session.token) {
		if (req.session.rememberme) {
			var time = new Date();
			if (time - req.session.tokenGenTime < timeout) {
				return true; 
			} else {
				console.log("token expires");
				return false;
			}
		}
		else {
			console.log("has token, but not rememberme");
			return false;
		}
	} else {
		console.log("token doesn't exist");
		return false;
	}
};

module.exports.login = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var rememberme = req.body.rememberme;
	User.findOne({username: username}, function(err, user){
		if (err) {
			console.log("database find error", err);
			res.json(200, {message: "database find error", success: false});
		}
		else if (!user) res.json(200, {message: "invalid username", success: false});
		else {
			user.comparePassword(password, function(err, isMatch){
				if (err) {
					console.log("comparePassword error", err);
					res.json(200, {message: "comparePassword err", success: false});
				}
				else if (isMatch) {
					req.session.token = user.generateRandomToken();
					req.session.tokenGenTime = new Date();
					if (rememberme) {
						req.session.cookie.maxAge = timeout;
						req.session.rememberme = true;
					}
					else {
						req.session.cookie.expire = false;
						req.session.rememberme = false;
					}
					res.json(200, {success: true});
				}
				else res.json(200, {message: "incorrect password", success: false});
			});
		}
	});
};

// module.exports.isAuth = isAuth;

module.exports.register = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var usr = new User({ username: username, email: email, password: password });
	usr.save(function(err) {
	  if(err) {
	    console.log("database save error", err);
	  } else {
	    res.send(200);
	  }
	});
};

module.exports.getUser = function(req, res) {
	console.log("starts getUser");
	if (isAuth(req, res)) {
		res.json(200, {username: req.session.username});
	} else {
		res.json(200, {});
	}
};