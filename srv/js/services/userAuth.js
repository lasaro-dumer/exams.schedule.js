angular.module('userAuth', ['ngCookies'])
	.factory('userPersistenceService', ['$cookies', function($cookies) {
		var loggedUser = {};

		return {
			setCookieData: function(loginData) {
				loggedUser.loginName = loginData.loginName;
				$cookies.put('loginName', loggedUser.loginName);
				loggedUser.sessionID = loginData.sessionID;
				$cookies.put('sessionID', loggedUser.sessionID);
			},
			getCookieData: function() {
				loggedUser.loginName = $cookies.get('loginName');
				loggedUser.sessionID = $cookies.get('sessionID');
				return loggedUser;
			},
			clearCookieData: function() {
				loggedUser  = {};
				$cookies.remove('loginName');
				$cookies.remove('sessionID');
			}
		}
	}]);