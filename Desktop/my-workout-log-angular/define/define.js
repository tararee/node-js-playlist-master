(function() {
	angular.module('workoutlog.define', [ 
		'ui.router' 
	])
	.config(defineConfig);

	function defineConfig($stateProvider) {

		$stateProvider
			.state('define', {
				url: '/define',
				templateUrl: '/define/define.html',
				controller: DefineController
			});
	}

	defineConfig.$inject = [ '$stateProvider' ];

	function DefineController($scope, $state ) {
		$scope.message = "A friendly place to log workouts!";
	}

	DefineController.$inject = ['$scope', '$state' ];
})();