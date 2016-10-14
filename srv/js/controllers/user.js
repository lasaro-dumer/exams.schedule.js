angular.module('userModule', [])
	.controller('userController', ['$scope', '$http', 'Users', '$route', '$routeParams', '$location',
		function($scope, $http, Users, $route, $routeParams, $location) {
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.$routeParams = $routeParams;
			console.log($scope.$route);
			console.log($scope.$location.path());
			console.log($scope.$routeParams);
			Users.logged(function(result) {
				console.log(result);
				$scope.logged = result;
			});
			$scope.user = {};
			$scope.userList = [];
			$scope.newUser = {};
			// Retrieving a cookie
			//var loggedUser = $cookies.get('loggedUser');
			//console.log('loggedUser',loggedUser);
			$scope.login = function() {
				if ($scope.user.loginName && $scope.user.password) {
					Users.login($scope.user, function(success, message) {
						if (!success) {
							alert(message);
						}
						Users.logged(function(result) {
							$scope.logged = result;
						});
					});
				}
			};
			$scope.listUsers = function() {
				Users.get().success(function(data) {
					$scope.userList = data;
				});
			};
			$scope.addUser = function() {
				if ($scope.newUser.name !== '' &&
					$scope.newUser.loginName !== '' &&
					$scope.newUser.password !== '') {
					Users.create($scope.newUser)
						.success(function(data) {
							console.log('inserted', data);
							$scope.listUsers();
						})
				} else {
					alert('Fill all user info to add');
				}
			};
			/*
					// CREATE ==================================================================
					// when submitting the add form, send the text to the node API
					$scope.createTodo = function() {

						// validate the formData to make sure that something is there
						// if form is empty, nothing will happen
						if ($scope.formData.text != undefined) {
							$scope.loading = true;

							// call the create function from our service (returns a promise object)
							Todos.create($scope.formData)

								// if successful creation, call our get function to get all the new todos
								.success(function(data) {
									$scope.loading = false;
									$scope.formData = {}; // clear the form so our user is ready to enter another
									$scope.todos = data; // assign our new list of todos
								});
						}
					};

					// DELETE ==================================================================
					// delete a todo after checking it
					$scope.deleteTodo = function(id) {
						$scope.loading = true;

						Todos.delete(id)
							// if successful creation, call our get function to get all the new todos
							.success(function(data) {
								$scope.loading = false;
								$scope.todos = data; // assign our new list of todos
							});
					};//*/
		}
	]);