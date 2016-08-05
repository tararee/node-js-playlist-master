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