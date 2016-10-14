var usersList = [{
	"id": 1,
	"name": "Lásaro Dumer",
	"loginName": "lasaro.dumer",
	"password": "xuxu"
}, {
	"id": 2,
	"name": "João Silva",
	"loginName": "joao.silva",
	"password": "xuxu"
}];
/*
{_id:1,name: "Lásaro Dumer",loginName: "lasaro.dumer",password: "xuxu"}
*/
var User = require('../models/user');

exports.updateUser = function(userData,next) {
	var updated;
	if (userData && userData.id) {
		for (var index = 0; index < usersList.length; index++) {
			var user = usersList[index];
			if (user.id == userData.id) {
				usersList[index] = userData;
				updated = usersList[index];
				break;
			}
		}
	}
	next(updated);
}

exports.deleteUser = function(userId,next) {
	var deleted = false;
	if (userId) {
		for (var index = 0; index < usersList.length; index++) {
			var user = usersList[index];
			if (user.id == userId) {
				usersList.splice(index,1);
				deleted = true;
				break;
			}
		}
	}
	next(deleted);
}

exports.searchByLoginName = function(loginName, next) {
	var found;
	if (loginName) {
		for (var index = 0; index < usersList.length; index++) {
			var userData = usersList[index];
			if (userData.loginName == loginName) {
				found = userData;
				break;
			}
		}
	}
	next(found);
};