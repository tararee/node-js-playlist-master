(function() {
	var app = angular.module('workoutlog', [
		'ui.router',
		'workoutlog.define',
		'workoutlog.logs',
		'workoutlog.history',
		'workoutlog.auth.signup',
		'workoutlog.auth.signin',
	]);

	function config($urlRouterProvider) {
		$urlRouterProvider.otherwise('/signin');
	}

	config.$inject = [ '$urlRouterProvider' ];
	app.config(config);
	app.constant('API_BASE', '//localhost:3000/api/');
})();
(function() {
	angular.module('workoutlog.auth.signin', [
		'ui.router'
	])
	.config(signinConfig);

	function signinConfig($stateProvider) {
		$stateProvider
			.state('signin', {
				url: '/signin',
				templateUrl: '/components/auth/signin.html',
				controller: SigninController,
				controllerAs: 'ctrl',
				bindToController: this
			});
	}

	signinConfig.$inject = [ '$stateProvider' ];

	function SigninController( $state, UsersService ) {
		var vm = this;
		vm.user = {};
		vm.login = function() {
			UsersService.login(vm.user).then(function() {
				$state.go('define');
			});
		};
	}
	SigninController.$inject = [ '$state', 'UsersService' ];
})();
(function() {
	angular
		.module('workoutlog.auth.signup', ['ui.router'])
		.config(signupConfig);

		function signupConfig($stateProvider) {
			$stateProvider
				.state('signup', {
					url: '/signup',
					templateUrl: '/components/auth/signup.html',
					controller: SignUpController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}

		signupConfig.$inject = ['$stateProvider'];

		function SignUpController($state, UsersService) {
			var vm = this;
			vm.user = {};
			vm.submit = function() {
				UsersService.create(vm.user).then(function(response) {
					$state.go('define');
				});
			};
		}

		SignUpController.$inject = [ '$state', 'UsersService' ];
})();
(function() {
	angular.module('workoutlog')
	.directive('userlinks',
		function() {
			UserLinksController.$inject = [ '$state', 'CurrentUser', 'SessionToken' ];
			function UserLinksController($state, CurrentUser, SessionToken) {
				var vm  = this;
				vm.user = function() {
					return CurrentUser.get();
				};

				vm.signedIn = function() {
					return !!(vm.user().id);
				};

				vm.logout = function() {
					CurrentUser.clear();
					SessionToken.clear();
					$state.go('signin');
				};
			}

			return {
				scope: {},
				controller: UserLinksController,
				controllerAs: 'ctrl',
				bindToController: true,
				templateUrl: '/components/auth/userlinks.html'
				 
			};
		});
})();
(function() {
	angular.module('workoutlog.define', [
		'ui.router'
	])
	.config(defineConfig);

	function defineConfig($stateProvider) {

		$stateProvider
			.state('define', {
				url: '/define',
				templateUrl: '/components/define/define.html',
				controller: DefineController,
				controllerAs: 'ctrl',
				bindToController: this,
				resolve: [
				'CurrentUser', '$q', '$state',
				function(CurrentUser, $q, $state) {
					var deferred = $q.defer();
					if (CurrentUser.isSignedIn()) {
						deferred.resolve();
			}	else {
				deferred.reject();
				$state.go('signin');
			}
				}
				]
			});
	}

	defineConfig.$inject = [ '$stateProvider' ];

	function DefineController( $state, DefineService ) {
		var vm = this;
		vm.definition = {};
		vm.save = function() {
			DefineService.save(vm.definition);
		};
	}

	DefineController.$inject = [ '$state', 'DefineService' ];
})();
(function(){
	angular.module('workoutlog.history', ['ui.router'])
	.config(historyConfig);

	historyConfig.$inject = [ '$stateProvider' ];
	function historyConfig($stateProvider) {
		$stateProvider
			.state('history', {
				url: '/history',
				templateUrl: '/components/history/history.html',
				controller: HistoryController,
				controllerAs: 'ctrl',
				bindToController: this,
				resolve: {
					fetchHistory: [
					'LogsService',
					function(LogsService) {
						return LogsService.fetch();
					}
				]
			}

		});
	}

	HistoryController.$inject = [ 'LogsService' ];
	function HistoryController( LogsService ) {
		var vm = this;
		vm.history = LogsService.get();
	}
})();
(function(){
	angular
		.module('workoutlog.logs', ['ui.router'])
		.config(logsConfig);

	logsConfig.$inject = [ '$stateProvider' ];
	function logsConfig($stateProvider){
		$stateProvider
			.state('logs', {
				url: '/logs',
				templateUrl: '/components/logs/logs.html',
				controller: LogsController,
				controllerAs: 'ctrl',
				bindToController: this,
				resolve: {
				getUserDefinitions: [
					'DefineService',
					function(DefineService) {
						return DefineService.fetch();
					}
				]
			}

		});
	}

	LogsController.$inject = [ 'DefineService', 'LogsService' ];
	function LogsController( DefineService, LogsService ) {
		var vm = this;
		vm.log = {};
		vm.userDefinitions = DefineService.getDefinitions();
		vm.save = function() {
			LogsService.save(vm.log);
		};
	}
})();
(function() {
	angular.module('workoutlog')
		.factory('AuthInterceptor', 
			[ 'SessionToken', 'API_BASE', 
			function(SessionToken, API_BASE) {
				return {
					request: function(config) {
						var token = SessionToken.get();
						if (token && config.url.indexOf(API_BASE) > -1) {
							config.headers['Authorization'] = token;
						}
						return config;
					}
				};
			}]);

	angular.module('workoutlog')
		.config(['$httpProvider', function($httpProvider) {
			return $httpProvider.interceptors.push('AuthInterceptor');
		}]);
})();
(function() {
	angular.module('workoutlog')
		.service('CurrentUser', [ '$window', function($window) {
			function CurrentUser() {
				var currUser = $window.localStorage.getItem('currentUser');
				if (currUser && currUser !== "undefined") {
					this.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
				}
			}
			CurrentUser.prototype.set = function(user) {
				this.currentUser = user;
				$window.localStorage.setItem('currentUser', JSON.stringify(user));
			};
			CurrentUser.prototype.get = function() {
				return this.currentUser || {};
			};
			CurrentUser.prototype.clear = function() {
				this.currentUser = undefined;
				$window.localStorage.removeItem('currentUser');
			};
			CurrentUser.prototype.isSignedIn = function() {
				return !!this.get().id;
			};
			return new CurrentUser();
		}]);
})();
(function() {
	angular.module('workoutlog')
	.service('DefineService', DefineService);

	DefineService.$inject = [ '$http', 'API_BASE' ];
	function DefineService($http, API_BASE) {
		var defineService = this;
		defineService.userDefinitions = [];

		defineService.save = function(definition) {
			return $http.post(API_BASE + 'definition', {
				definition: definition
			}).then(function(response) {
				defineService.userDefinitions.unshift(response.data);
			});
		};

		defineService.fetch = function() {
			return $http.get(API_BASE + 'definition')
			.then(function(response) {
				defineService.userDefinitions = response.data;
			});
		};

		defineService.getDefinitions = function() {
			return defineService.userDefinitions;
		};
	}
})();
(function() {
	angular.module('workoutlog')
	.service('LogsService', LogsService);

	LogsService.$inject = [ '$http', 'API_BASE' ];
	function LogsService($http, API_BASE) {
		var logsService = this;

		logsService.workouts = [];

		logsService.save = function(log) {
			return $http.post(API_BASE + 'log', {
				log: log
			}).then(function(response) {
				logsService.workouts.push(response.data);
			});
		};

		logsService.fetch = function() {
			return $http.get(API_BASE + 'log')
			.then(function(response) {
				logsService.workouts = response.data;
			});
		};

		logsService.get = function() {
			return logsService.workouts;
		};
	}
})();
(function() {
	angular.module('workoutlog')
		.service('SessionToken', [ '$window', function($window) {
			function SessionToken() {
				this.sessionToken = $window.localStorage.getItem('sessionToken');
			}
			SessionToken.prototype.set = function(token) {
				this.sessionToken = token;
				$window.localStorage.setItem('sessionToken', token);
			};
			SessionToken.prototype.get = function() {
				return this.sessionToken;
			};
			SessionToken.prototype.clear = function() {
				this.sessionToken = undefined;
				$window.localStorage.removeItem('sessionToken');
			};
			return new SessionToken();
		}]);
})();
(function() {
	angular.module('workoutlog')
		.service('UsersService', [
			'$http', 'API_BASE', 'SessionToken', 'CurrentUser',
			function($http, API_BASE, SessionToken, CurrentUser) {
				function UsersService() {
				}

				UsersService.prototype.create = function(user) {
					var userPromise = $http.post(API_BASE + 'user', {
						user: user
					});

					userPromise.then(function(response) {
						SessionToken.set(response.data.sessionToken);
						CurrentUser.set(response.data.user);
					});
					return userPromise;
				};

				UsersService.prototype.login = function(user) {
					var loginPromise = $http.post(API_BASE + 'login', {
						user: user
					});
					loginPromise.then(function(response) {
						SessionToken.set(response.data.sessionToken);
						CurrentUser.set(response.data.user);
					});
					return loginPromise;
				};

				return new UsersService();
			}]);
})();
//# sourceMappingURL=bundle.js.map
