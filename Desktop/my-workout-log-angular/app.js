(function() {
	var app = angular.module('workoutlog', [
		'ui.router',
		'workoutlog.define',
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