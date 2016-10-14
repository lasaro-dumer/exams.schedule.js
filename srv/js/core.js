angular.module('exams', ['ngRoute', 'userModule', 'userService', 'userAuth'])
	.controller('BookController', function($scope, $routeParams) {
		$scope.name = "BookController";
		$scope.params = $routeParams;
	})
	.controller('ChapterController', function($scope, $routeParams) {
		$scope.name = "ChapterController";
		$scope.params = $routeParams;
	})
	.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider
				/*.when('/Book/:bookId', {
					templateUrl: 'book.html',
					controller: 'BookController',
					resolve: {
						// I will cause a 1 second delay
						delay: function($q, $timeout) {
							var delay = $q.defer();
							$timeout(delay.resolve, 1000);
							return delay.promise;
						}
					}
				})*/
				.when('/login', {
					templateUrl: 'login.html',
					controller: 'userController'
				})
				.when('/user', {
					templateUrl: 'user.html',
					controller: 'userController'
				});

			//$locationProvider.html5Mode(true);
		}
	]);