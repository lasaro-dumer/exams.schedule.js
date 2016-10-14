angular.module('userService', [])
	/*
	/user			GET		Get all the users.
	/user			POST	Create a user.
	/user/:userId	GET		Get a single user.
	/user/:userId	PUT		Update a user with new info.
	/user/:userId	DELETE	Delete a bear.
	/user/login		POST	Login with user.
	*/
	// super simple service
	// each function returns a promise object 
	.factory('Users', ['$http', 'userPersistenceService', function($http, userPersistenceService) {
		return {
			get: function() {
				return $http.get('/api/user');
			},
			create: function(userData) {
				return $http.post('/api/user', userData);
			},
			getById: function(id) {
				return $http.get('/api/user/' + id);
			},
			update: function(userData) {
				return $http.put('/api/user/' + userData.id, userData);
			},
			delete: function(id) {
				return $http.delete('/api/user/' + id);
			},
			logged: function(next) {
				var loggedData = userPersistenceService.getCookieData();
				if(loggedData)
					this.login(loggedData, function(success, message) {
						next(success);
					});
				else
					next(false);
			},
			login: function(userData, next) {
				var logged = false;
				$http.post('/api/user/login', userData)
					.then(function(response) {
						if (response.data.success) {
							logged = true;
							userPersistenceService.setCookieData(response.data);
						} else {
							userPersistenceService.clearCookieData();
						}
						next(logged, response.data.message);
					}, function(response) {
						userPersistenceService.clearCookieData();
						next(logged, (response.data || 'Request failed'));
					});
			}
		}
	}]);